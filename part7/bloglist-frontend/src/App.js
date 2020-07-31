import React, { useState, useEffect } from 'react'
import Messanger from './components/Messanger'
import blogService from './services/blogs'
import BlogsComponent from './components/BlogsComponent'
import LoginForm from './components/LoginForm'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState({ message: '', state: 'inactive' })

	function messageUpdater(message, state) {
		setMessage({ message, state })
		setTimeout(() => {
			setMessage({ message: '', state: 'inactive' })
		}, 5000)
	}

	useEffect(() => {
		blogService.getAll().then(blogs => setBlogs(blogs))
	}, [])

	useEffect(() => {
		if (window.localStorage.getItem('blogUser')) {
			const parsedUser = JSON.parse(
				window.localStorage.getItem('blogUser')
			)
			setUser(parsedUser)
			blogService.setToken(parsedUser)
		}
	}, [])

	return (
		<div>
			<h2>Blogs</h2>
			<Messanger message={message.message} state={message.state} />
			{user === null ? (
				<LoginForm setUser={setUser} messageUpdater={messageUpdater} />
			) : (
				<BlogsComponent
					user={user}
					setUser={setUser}
					messageUpdater={messageUpdater}
					blogs={blogs}
					setBlogs={setBlogs}
				/>
			)}
		</div>
	)
}

export default App
