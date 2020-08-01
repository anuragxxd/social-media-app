const express = require("express");
const app = express();
app.use(express.json());
const cookieParser = require("cookie-parser");
const userRouter = require("./src/routes/user");
const postRouter = require("./src/routes/post");
const friendRouter = require("./src/routes/friend");
require("./src/db/mongoose");

app.use(express.json());
app.use(userRouter);
app.use(postRouter);
app.use(friendRouter);
app.use(cookieParser());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
