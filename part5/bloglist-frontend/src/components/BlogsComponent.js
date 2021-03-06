import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import AddBlogForm from './AddBlogForm'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import Blog from './Blog'

const BlogsComponent = ({ user, setUser, messageUpdater, blogs, setBlogs }) => {
	const noteFormRef = useRef()

	const handleLogOut = () => {
		setUser(null)
		window.localStorage.removeItem('blogUser')
	}

	const toggle = () => {
		noteFormRef.current.toggleVisibility()
	}

	const likeBlog = async blog => {
		const updatedBlog = await blogService.update(blog)
		const newBlogs = blogs.filter(b => b.id !== blog.id)
		setBlogs(newBlogs.concat(updatedBlog))
	}

	const sortBlogs = () => {
		let sortedBlogs = [].concat(
			blogs.sort((a, b) => {
				return b.likes - a.likes
			})
		)
		return sortedBlogs
	}

	const deleteBlog = async blog => {
		if (
			window.confirm(
				`Are you sure you want to delete ${blog.title} by ${blog.author}?`
			)
		) {
			await blogService.remove(blog)
			setBlogs(blogs.filter(b => b.id !== blog.id))
		}
	}

	const handleAddBlog = async (title, author, url) => {
		try {
			const createdBlog = await blogService.create({
				title,
				author,
				url,
			})
			messageUpdater(
				`Created blog entry "${createdBlog.title}" by ${createdBlog.author}`,
				'success'
			)
			toggle()
			setBlogs(blogs.concat(createdBlog))
		} catch (exception) {
			console.log(exception)
			messageUpdater('Creating new blog failed, try again.', 'error')
		}
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
				openLabel="Add new blog"
				closeLabel="cancel"
				ref={noteFormRef}
			>
				<AddBlogForm handleAddBlog={handleAddBlog} />
			</Togglable>
			<hr />
			{sortBlogs().map(blog => (
				<Blog
					key={blog.id}
					blog={blog}
					likeBlog={likeBlog}
					user={user}
					deleteBlog={deleteBlog}
				/>
			))}
		</>
	)
}

BlogsComponent.propTypes = {
	user: PropTypes.PropTypes.object.isRequired,
	setUser: PropTypes.func.isRequired,
	messageUpdater: PropTypes.func.isRequired,
	blogs: PropTypes.array.isRequired,
	setBlogs: PropTypes.func.isRequired,
}

export default BlogsComponent
