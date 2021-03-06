import {createStore, combineReducers, applyMiddleware} from 'redux'
// import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import problemsReducer from './problem'
import guest from './guest'

const reducer = combineReducers({
  user,
  problemsReducer,
  guest
})
const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware
    // createLogger({collapsed: true})
  )
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './guest'
