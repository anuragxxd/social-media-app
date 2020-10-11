import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import * as serviceWorker from './serviceWorker'
import { subscribeUser } from './subscription'

const composeEnancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnancers(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
        <App></App>
    </Provider>,
    document.querySelector('#root')
)

serviceWorker.register()
subscribeUser()
