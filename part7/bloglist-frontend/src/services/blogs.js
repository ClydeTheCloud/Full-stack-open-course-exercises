import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = user => {
	token = `bearer ${user.token}`
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = async blog => {
	const config = {
		headers: {
			Authorization: token,
		},
	}

	const response = await axios.post(baseUrl, blog, config)
	return response.data
}

const update = async blog => {
	blog.likes += 1

	const response = await axios.put(baseUrl + '/' + blog.id, blog)
	return response.data
}

const remove = async blog => {
	const config = {
		headers: {
			Authorization: token,
		},
	}

	await axios.delete(baseUrl + '/' + blog.id, config)
	return blog.id
}

export default { getAll, create, update, remove, setToken }
