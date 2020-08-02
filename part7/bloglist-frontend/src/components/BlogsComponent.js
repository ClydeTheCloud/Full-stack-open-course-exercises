import React, { useRef } from 'react'
import AddBlogForm from './AddBlogForm'
import Togglable from './Togglable'
import Blog from './Blog'

import { useSelector } from 'react-redux'

const BlogsComponent = () => {
	const noteFormRef = useRef()

	const blogs = useSelector(state => state.blogs)

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
