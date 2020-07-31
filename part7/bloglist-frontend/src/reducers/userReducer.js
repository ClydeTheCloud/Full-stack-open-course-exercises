import loginServices from '../services/login'

const userReducer = (state = null, action) => {
	switch (action.type) {
		case 'INIT':
			return
		case 'LOGIN':
			return
		case 'LOGOUT':
			return
		default:
			return state
	}
}

export default userReducer
