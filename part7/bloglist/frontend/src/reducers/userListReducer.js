import userService from '../services/users'

export const initUserList = () => {
	return async dispatch => {
		const userList = await userService.getAll()
		dispatch({
			type: 'INIT_USER_LIST',
			data: userList,
		})
	}
}

const userListReducer = (state = [], action) => {
	switch (action.type) {
		case 'INIT_USER_LIST':
			return action.data
		default:
			return state
	}
}

export default userListReducer
