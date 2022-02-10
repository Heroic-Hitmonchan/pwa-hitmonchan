import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {photo} from './camera'
import {file} from './camera'
import song from './spotify'
import user from './user'
import token from './token'
import list from './list'

const reducer = combineReducers({
  file,
  photo,
  song,
  user,
  token,
  list
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
