import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const addNew = async anecdoteText => {
	const getId = () => (100000 * Math.random()).toFixed(0)
	const newAnecdote = {
		content: anecdoteText,
		id: getId(),
		votes: 0,
	}
	const response = await axios.post(baseUrl, newAnecdote)
	return response.data
}

const vote = async votedAnecdote => {
	votedAnecdote.votes++
	const response = await axios.put(
		`${baseUrl}/${votedAnecdote.id}`,
		votedAnecdote
	)
	return response.data
}

export default { getAll, addNew, vote }
