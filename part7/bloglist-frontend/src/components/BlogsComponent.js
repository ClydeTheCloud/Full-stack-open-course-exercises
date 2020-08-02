import React, { useRef } from 'react'
import AddBlogForm from './AddBlogForm'
import Togglable from './Togglable'
import Blog from './Blog'

import { useDispatch, useSelector } from 'react-redux'

import { userLogout } from '../reducers/userReducer'

const BlogsComponent = () => {
	const noteFormRef = useRef()

	const dispatch = useDispatch()

	const blogs = useSelector(state => state.blogs)
	const user = useSelector(state => state.user)

	const handleLogOut = () => {
		dispatch(userLogout())
	}

	const toggle = () => {
		noteFormRef.current.toggleVisibility()
	}

	const sortBlogs = () => {
		let sortedBlogs = [].concat(
			blogs.sort((a, b) => {
				return b.likes - a.likes
			})
		)
		return sortedBlogs
	}

	return (
		<>
			<h3>Logged in as {user.displayName}</h3>
			{/* <br /> */}
			<button id={'logout-button'} onClick={handleLogOut}>
				Log Out
			</button>
			<hr />
			<Togglable
				openLabel='Add new blog'
				closeLabel='cancel'
				ref={noteFormRef}>
				<AddBlogForm toggle={toggle} />
			</Togglable>
			<hr />
			{sortBlogs().map(blog => (
				<Blog key={blog.id} blog={blog} />
			))}
		</>
	)
}

export default BlogsComponent
