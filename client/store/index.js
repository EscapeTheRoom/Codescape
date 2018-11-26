import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import problemsReducer from './problem'
import guest from './guest.js'
import guest2 from './guest2.js'

const reducer = combineReducers({
  user,
  problemsReducer,
  guest,
  guest2
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './guest.js'
export * from './guest2.js'
