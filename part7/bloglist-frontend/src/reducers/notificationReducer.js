const initState = { message: 'Welcome', status: 'success' }

let timerId

export const messangeHandler = (action, time = 3) => {
	return async dispatch => {
		dispatch(action)
		clearTimeout(timerId)
		timerId = await setTimeout(() => {
			dispatch(messangerDelete())
		}, time * 1000)
	}
}

export const messangerInit = () => {
	return {
		type: 'INIT_MESSANGER',
		data: initState,
	}
}

export const messangerCreate = (message, status) => {
	return {
		type: 'NEW_MESSAGE',
		data: { message, status },
	}
}

const messangerDelete = () => {
	return {
		type: 'DELETE_MESSAGE',
	}
}

const notificationReducer = (
	state = { message: '', status: 'inactive' },
	action
) => {
	switch (action.type) {
		case 'INIT_MESSANGER':
			return action.data
		case 'NEW_MESSAGE':
			const newMessage = action.data
			return newMessage
		case 'DELETE_MESSAGE':
			const emptyMessageState = { message: '', status: 'inactive' }
			return emptyMessageState
		default:
			return state
	}
}

export default notificationReducer
