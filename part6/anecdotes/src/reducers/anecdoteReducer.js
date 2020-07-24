import anecdoteService from '../services/anecdotes'

export const vote = anecdote => {
	return async dispatch => {
		const anecdoteAfterVoting = await anecdoteService.vote(anecdote)
		dispatch({
			type: 'VOTE_ANECDOTE',
			data: anecdoteAfterVoting,
		})
	}
}

export const create = content => {
	return async dispatch => {
		const createdAnecdote = await anecdoteService.addNew(content)
		dispatch({
			type: 'NEW_ANECDOTE',
			data: createdAnecdote,
		})
	}
}

export const init = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch({
			type: 'INIT_ANECDOTES',
			data: anecdotes,
		})
	}
}

const anecdoteReducer = (state = [], action) => {
	switch (action.type) {
		case 'INIT_ANECDOTES':
			return action.data
		case 'VOTE_ANECDOTE':
			const votedAnecdote = state.find(
				anecdote => anecdote.id === action.data.id
			)
			return [
				...state.filter(anecdote => anecdote.id !== action.data.id),
				votedAnecdote,
			]
		case 'NEW_ANECDOTE':
			return [...state, action.data]
		default:
			return state
	}
}

export default anecdoteReducer
