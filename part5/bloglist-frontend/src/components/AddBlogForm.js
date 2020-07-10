import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const AddBlogForm = ({ messageUpdater, blogs, setBlogs, toggleVisibility }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleAddBlog = async event => {
		event.preventDefault()
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
			toggleVisibility()
			setTitle('')
			setTitle('')
			setUrl('')
			setBlogs(blogs.concat(createdBlog))
		} catch (exception) {
			console.log(exception)
			messageUpdater('Creating new blog failed, try again.', 'error')
		}
	}

	return (
		<form onSubmit={handleAddBlog}>
			<h3>Add new blog:</h3>
			<label>
				Title:
				<input
					type="text"
					value={title}
					name="title"
					onChange={event => {
						setTitle(event.target.value)
					}}
				></input>
			</label>
			<br />
			<label>
				Author:
				<input
					type="text"
					value={author}
					name="author"
					onChange={event => {
						setAuthor(event.target.value)
					}}
				></input>
			</label>
			<br />
			<label>
				URL:
				<input
					type="text"
					value={url}
					name="url"
					onChange={event => {
						setUrl(event.target.value)
					}}
				></input>
			</label>
			<br />
			<button type="submit">create</button>
		</form>
	)
}

//messageUpdater, blogs, setBlogs, toggleVisibility
AddBlogForm.propTypes = {
	messageUpdater: PropTypes.func.isRequired,
	blogs: PropTypes.array.isRequired,
	setBlogs: PropTypes.func.isRequired,
	toggleVisibility: PropTypes.func.isRequired,
}

export default AddBlogForm
