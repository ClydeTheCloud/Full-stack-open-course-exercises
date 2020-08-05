import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { blogCreate } from '../reducers/blogReducer'
import {
	messangerCreate,
	messangeHandler,
} from '../reducers/notificationReducer'
import './FormSvgBg.css'

const AddBlogForm = ({ toggle }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const dispatch = useDispatch()

	const submitHandler = async event => {
		event.preventDefault()
		try {
			await dispatch(blogCreate({ title, author, url }))
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
		<form onSubmit={submitHandler} className="p-5 rounded-lg FormSvgBg">
			<div className="max-w-2xl mx-auto rounded-md bg-purple-500 text-white p-6">
				<h3 className="mb-5">Add new blog:</h3>
				<label>
					Title:
					<br />
					<input
						className="p-1 border rounded border-purple-800 w-full mb-5 text-black"
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
					<br />
					<input
						className="p-1 border rounded border-purple-800 w-full mb-5 text-black"
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
					<br />
					<input
						className="p-1 border rounded border-purple-800 w-full mb-5 text-black"
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
				<div className="flex justify-between">
					<button
						className="btn bg-blue-800 text-white mr-24 hover:bg-purple-600"
						id="create-button"
						type="submit"
					>
						create
					</button>
					<button
						type="reset"
						className="btn bg-blue-800 text-white hover:bg-purple-600"
						onClick={toggle}
					>
						cancel
					</button>
				</div>
			</div>
		</form>
	)
}

export default AddBlogForm
