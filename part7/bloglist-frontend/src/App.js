import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import BlogsComponent from './components/BlogsComponent'
import LoginForm from './components/LoginForm'
import Header from './components/Header'

import { blogInit } from './reducers/blogReducer'
import { messangerInit, messangeHandler } from './reducers/notificationReducer'
import { userInit } from './reducers/userReducer'
import UsersComponent from './components/UsersComponent'

const App = () => {
	const user = useSelector(state => state.user)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(userInit())
		dispatch(blogInit())
		dispatch(messangeHandler(messangerInit(), 10))
	}, [dispatch])

	return (
		<Router>
			<Header />
			<Switch>
				<Route path='/users'>
					<UsersComponent />
				</Route>
				<Route path='/'>
					<h2>Blog App</h2>
					{user === null ? <LoginForm /> : <BlogsComponent />}
				</Route>
			</Switch>
		</Router>
	)
}

export default App
