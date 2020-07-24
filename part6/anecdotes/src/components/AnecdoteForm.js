import React from 'react'
import { connect } from 'react-redux'

import { create } from '../reducers/anecdoteReducer'

function AnecdoteForm(props) {
	const submitAnecdote = async event => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		props.create(content)
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

const mapDispatchToProps = { create }

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm
