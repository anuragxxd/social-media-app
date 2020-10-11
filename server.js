const express = require('express')
const socketio = require('socket.io')
const app = express()
var server = require('http').createServer(app)
app.use(express.json())
const cookieParser = require('cookie-parser')
const userRouter = require('./src/routes/user')
const postRouter = require('./src/routes/post')
const friendRouter = require('./src/routes/friend')
const feedRouter = require('./src/routes/feed')
const messageRouter = require('./src/routes/message')
const path = require('path')
require('./src/db/mongoose')
const io = socketio(server)
require('./src/sockets/chat')(io)
const webpush = require('web-push')

app.use(express.json())
app.use(userRouter)
app.use(postRouter)
app.use(friendRouter)
app.use(feedRouter)
app.use(messageRouter)
app.use(cookieParser())
webpush.setVapidDetails(
    process.env.WEB_PUSH_CONTACT,
    process.env.PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY
)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

app.post('/notifications/subscribe', (req, res) => {
    const subscription = req.body

    const payload = JSON.stringify({
        title: 'Hello!',
        body: 'Welcome to Social Apes',
    })

    webpush
        .sendNotification(subscription, payload)
        .then((result) => console.log(result))
        .catch((e) => console.log(e.stack))

    res.status(200).json({ success: true })
})

const port = process.env.PORT

server.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})
