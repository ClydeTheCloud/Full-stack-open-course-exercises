import React from 'react'
import { useDispatch } from 'react-redux'

import { create } from '../reducers/anecdoteReducer'

function AnecdoteForm() {
	const dispatch = useDispatch()

	const submitAnecdote = async event => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch(create(content))
	}

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={submitAnecdote}>
				<label>
					Anecdote: <input type="text" name="anecdote" />
				</label>
				<button type="submit">Submit</button>
			</form>
		</>
	)
}

export default AnecdoteForm
