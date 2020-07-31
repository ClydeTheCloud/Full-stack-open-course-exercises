import React, { useState } from 'react'
import PropTypes from 'prop-types'

const AddBlogForm = ({ handleAddBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const submitHandler = event => {
		event.preventDefault()
		handleAddBlog(title, author, url)
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<form onSubmit={submitHandler}>
			<h3>Add new blog:</h3>
			<label>
				Title:
				<input
					id="title-input"
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
					id="author-input"
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
					id="url-input"
					type="text"
					value={url}
					name="url"
					onChange={event => {
						setUrl(event.target.value)
					}}
				></input>
			</label>
			<br />
			<button id="create-button" type="submit">
				create
			</button>
		</form>
	)
}

//messageUpdater, blogs, setBlogs, toggleVisibility
AddBlogForm.propTypes = {
	handleAddBlog: PropTypes.func.isRequired,
}

export default AddBlogForm
