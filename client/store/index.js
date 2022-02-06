import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import camera from './camera'
import song from './spotify'
import user from './user'
// import auth from './auth'

// const reducer = combineReducers({ auth })
// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
// )

const reducer = combineReducers({
  camera,
  song,
  user
});

// this is temp reducer
// const SET_AUTH = 'SET_AUTH'
// const reducer = (state = {}, action) => {
//   switch (action.type) {
//     case SET_AUTH:
//       return action.auth;
//     default:
//       return state;
//   }
// }


const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
// export * from './auth'
