import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Messanger from './components/Messanger'
import BlogsComponent from './components/BlogsComponent'
import LoginForm from './components/LoginForm'

import { blogInit } from './reducers/blogReducer'
import { messangerInit, messangeHandler } from './reducers/notificationReducer'
import { userInit } from './reducers/userReducer'

const App = () => {
	const user = useSelector(state => state.user)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(userInit())
		dispatch(blogInit())
		dispatch(messangeHandler(messangerInit(), 10))
	}, [dispatch])

	return (
		<div>
			<h2>Blogs</h2>
			<Messanger />
			{user === null ? <LoginForm /> : <BlogsComponent />}
		</div>
	)
}

export default App
