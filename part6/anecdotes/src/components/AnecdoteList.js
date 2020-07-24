import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { newMessage } from '../reducers/notificationReducer'

function AnecdoteList(props) {
	const sortedAnecdotes = () => {
		const sortedAnecdotes = [].concat(
			props.anecdotes.sort((a, b) => b.votes - a.votes)
		)
		return sortedAnecdotes
	}

	const voteHandler = anecdote => {
		props.vote(anecdote)
		props.newMessage(`You voted for '${anecdote.content}'`, 5)
	}

	return (
		<>
			{sortedAnecdotes()
				.filter(a => a.content.includes(props.filter))
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

const mapStateToProps = state => {
	return {
		anecdotes: state.anecdotes,
		filter: state.filter,
	}
}

const mapDispatchToProps = { vote, newMessage }

const ConnectedAnecdoteList = connect(
	mapStateToProps,
	mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
