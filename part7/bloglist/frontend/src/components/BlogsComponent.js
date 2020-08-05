import React, { useRef } from 'react'
import AddBlogForm from './AddBlogForm'
import Togglable from './Togglable'
// import Blog from './Blog'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function BlogLink({ blog }) {
	return (
		<Link
			className="p-3 hover:bg-purple-500 hover:text-white block first:rounded-t-lg last:rounded-b-lg hover:font-bold"
			to={`/blogs/${blog.id}`}
		>
			{blog.title} by {blog.author}
		</Link>
	)
}

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
				openLabel="Add new blog"
				closeLabel="cancel"
				ref={noteFormRef}
			>
				<AddBlogForm toggle={toggle} />
			</Togglable>
			<hr className="my-6" />
			<div className="p-6 rounded-md bg-purple-200">
				{sortBlogs().map(blog => (
					<BlogLink key={blog.id} blog={blog} />
				))}
			</div>
		</>
	)
}

export default BlogsComponent
