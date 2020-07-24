import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { newMessage } from '../reducers/notificationReducer'

function AnecdoteList() {
	const anecdotes = useSelector(state => state.anecdotes)
	const filter = useSelector(state => state.filter)
	const dispatch = useDispatch()

	const sortedAnecdotes = () => {
		const sortedAnecdotes = [].concat(
			anecdotes.sort((a, b) => b.votes - a.votes)
		)
		return sortedAnecdotes
	}

	const voteHandler = anecdote => {
		dispatch(vote(anecdote))
		dispatch(newMessage(`You voted for '${anecdote.content}'`, 2))
	}

	return (
		<>
			{sortedAnecdotes()
				.filter(a => a.content.includes(filter))
				.map(anecdote => (
					<div key={anecdote.id}>
						<div>{anecdote.content}</div>
						<div>
							has {anecdote.votes}
							<button
								onClick={() => {
									voteHandler(anecdote)
								}}
							>
								vote
							</button>
						</div>
					</div>
				))}
		</>
	)
}

export default AnecdoteList
