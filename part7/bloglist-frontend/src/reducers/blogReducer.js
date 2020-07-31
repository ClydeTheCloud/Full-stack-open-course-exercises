import blogServices from '../services/blogs'

export const init = () => {
	return async dispatch => {
		const blogs = await blogServices.getAll()
		dispatch({
			type: 'INIT_BLOGS',
			data: blogs,
		})
	}
}

export const create = content => {
	return async dispatch => {
		const createdBlog = await blogServices.create(content)
		dispatch({
			type: 'NEW_BLOG',
			data: createdBlog,
		})
	}
}

export const like = content => {
	return async dispatch => {
		const likedBlog = await blogServices.update(content)
		dispatch({
			type: 'LIKE_BLOG',
			data: likedBlog,
		})
	}
}

export const remove = content => {
	return async dispatch => {
		const deletedBlogId = await blogServices.remove(content)
		dispatch({
			type: 'DELETE_BLOG',
			data: deletedBlogId,
		})
	}
}

const blogReducer = (state = [], action) => {
	switch (action.type) {
		case 'INIT_BLOGS':
			return action.data
		case 'NEW_BLOG':
			return [...state, action.data]
		case 'LIKE_BLOG':
			const likedBlog = state.find(b => b.id === action.data.id)
			const newState = [
				...state.filter(b => b.id !== action.data.id),
				likedBlog,
			]
			return newState
		case 'DELETE_BLOG':
			const newState = state.filter(b => b.id !== action.data)
			return newState
		default:
			return state
	}
}

export default blogReducer
