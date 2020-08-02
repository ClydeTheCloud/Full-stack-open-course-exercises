import blogService from '../services/blogs'

export const blogInit = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch({
			type: 'INIT_BLOGS',
			data: blogs,
		})
	}
}

export const blogCreate = content => {
	return async dispatch => {
		const createdBlog = await blogService.create(content)
		dispatch({
			type: 'NEW_BLOG',
			data: createdBlog,
		})
	}
}

export const blogLike = content => {
	return async dispatch => {
		const likedBlog = await blogService.update(content)
		dispatch({
			type: 'LIKE_BLOG',
			data: likedBlog,
		})
	}
}

export const blogRemove = content => {
	return async dispatch => {
		const deletedBlogId = await blogService.remove(content)
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
			const stateAfterLike = [
				...state.filter(b => b.id !== action.data.id),
				likedBlog,
			]
			return stateAfterLike
		case 'DELETE_BLOG':
			const stateAfterDelete = state.filter(b => b.id !== action.data)
			return stateAfterDelete
		default:
			return state
	}
}

export default blogReducer
