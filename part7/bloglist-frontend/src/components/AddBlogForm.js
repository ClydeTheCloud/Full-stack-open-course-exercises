import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { blogCreate } from '../reducers/blogReducer'
import {
	messangerCreate,
	messangeHandler,
} from '../reducers/notificationReducer'

const AddBlogForm = ({ toggle }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const dispatch = useDispatch()

	const submitHandler = event => {
		event.preventDefault()
		try {
			dispatch(blogCreate({ title, author, url }))
			dispatch(
				messangeHandler(
					messangerCreate(
						`Created blog entry "${title}" by ${author}`,
						'success'
					),
					3
				)
			)
			toggle()
		} catch (exception) {
			dispatch(
				messangeHandler(
					messangerCreate(
						'Creating new blog failed, try again.',
						'error'
					),
					5
				)
			)
		}
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
					id='title-input'
					type='text'
					value={title}
					name='title'
					onChange={event => {
						setTitle(event.target.value)
					}}></input>
			</label>
			<br />
			<label>
				Author:
				<input
					id='author-input'
					type='text'
					value={author}
					name='author'
					onChange={event => {
						setAuthor(event.target.value)
					}}></input>
			</label>
			<br />
			<label>
				URL:
				<input
					id='url-input'
					type='text'
					value={url}
					name='url'
					onChange={event => {
						setUrl(event.target.value)
					}}></input>
			</label>
			<br />
			<button id='create-button' type='submit'>
				create
			</button>
		</form>
	)
}

export default AddBlogForm
