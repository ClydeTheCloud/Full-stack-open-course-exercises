const initialState = 'Welcome'

let messageTimer

export const newMessage = (msg, time = 5) => {
	return async dispatch => {
		clearTimeout(messageTimer)
		dispatch({
			type: 'NEW_MESSAGE',
			data: msg,
		})
		messageTimer = await setTimeout(() => {
			dispatch({
				type: 'DELETE_MESSAGE',
			})
		}, time * 1000)
	}
}

const notificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'NEW_MESSAGE':
			return action.data
		case 'DELETE_MESSAGE':
			return ''
		default:
			return state
	}
}

export default notificationReducer
