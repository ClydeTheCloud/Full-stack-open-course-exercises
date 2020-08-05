import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'

import BlogsComponent from './components/BlogsComponent'
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import UsersComponent from './components/UsersComponent'
import UserPage from './components/UserPage'

import { blogInit } from './reducers/blogReducer'
// import { messangerInit, messangeHandler } from './reducers/notificationReducer'
import { userInit } from './reducers/userReducer'
import { initUserList } from './reducers/userListReducer'
import BlogPage from './components/BlogPage'
import Messanger from './components/Messanger'

const App = () => {
	const blogs = useSelector(state => state.blogs)

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(userInit())
		dispatch(blogInit())
		// dispatch(messangeHandler(messangerInit(), 100))
	}, [dispatch])

	useEffect(() => {
		dispatch(initUserList())
	}, [blogs, dispatch])

	const user = useSelector(state => state.user)
	const userList = useSelector(state => state.userList)

	const userMatch = useRouteMatch('/users/:id')
	const userPage = userMatch
		? userList.find(u => u.id === userMatch.params.id)
		: null

	const blogMatch = useRouteMatch('/blogs/:id')
	const blogPage = blogMatch
		? blogs.find(b => b.id === blogMatch.params.id)
		: null

	return (
		<>
			<Header />
			<div className="container mx-auto pt-5">
				<Messanger />
				<Switch>
					<Route path="/users/:id">
						<UserPage user={userPage} />
					</Route>
					<Route path="/blogs/:id">
						<BlogPage blog={blogPage} />
					</Route>
					<Redirect from="/blogs/" to="/" />
					<Route path="/users">
						<UsersComponent />
					</Route>
					<Route path="/">
						<h2 className="my-6 text-3xl text-center">
							Blog App <span className="italic">with style</span>
						</h2>
						{user === null ? <LoginForm /> : <BlogsComponent />}
					</Route>
				</Switch>
			</div>
		</>
	)
}

export default App
