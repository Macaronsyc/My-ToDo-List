import { createStore, applyMiddleware, combineReducers } from 'redux'
// import { createLogger } from 'redux-logger'
import mytoDoApp from './containers/myApp'

// const loggerMiddleware = createLogger()
const createStorewWithMiddleware = applyMiddleware()(createStore)
const reducer = combineReducers({
	mytoDoApp,
})
const configureStore = (initialState) =>
	createStorewWithMiddleware(reducer, initialState)
export default configureStore
