import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const commonReducer = combineReducers({
	anecdotes: anecdoteReducer,
	notification: notificationReducer,
	filter: filterReducer,
})

const store = createStore(
	commonReducer,
	composeWithDevTools(applyMiddleware(thunk))
)

export default store
