export const change = input => {
	return {
		type: 'CHANGE_FILTER',
		data: input,
	}
}

const filterReducer = (state = '', action) => {
	switch (action.type) {
		case 'CHANGE_FILTER':
			return action.data
		default:
			return state
	}
}

export default filterReducer
