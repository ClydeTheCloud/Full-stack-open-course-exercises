import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'

const commonReducer = combineReducers({
	blogs: blogReducer,
	notification: notificationReducer,
	user: userReducer,
})

const store = createStore(
	commonReducer,
	composeWithDevTools(applyMiddleware(thunk))
)

export default store
