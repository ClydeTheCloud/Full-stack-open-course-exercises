import loginService from '../services/login';
import blogService from '../services/blogs';

export const userInit = () => {
	return {
		type: 'INIT_USER',
	};
};

export const userLogin = (login, password) => {
	return async dispatch => {
		const newUser = await loginService.login({ login, password });
		dispatch({
			type: 'LOGIN_USER',
			data: newUser,
		});
	};
};

export const userLogout = () => {
	return {
		type: 'LOGOUT_USER',
	};
};

const userReducer = (state = null, action) => {
	switch (action.type) {
		case 'INIT_USER':
			if (window.localStorage.getItem('blogUser')) {
				const parsedUser = JSON.parse(
					window.localStorage.getItem('blogUser')
				);
				blogService.setToken(parsedUser);
				return parsedUser;
			}
			return null;
		case 'LOGIN_USER':
			blogService.setToken(action.data);
			window.localStorage.setItem(
				'blogUser',
				JSON.stringify(action.data)
			);
			return action.data;
		case 'LOGOUT_USER':
			window.localStorage.removeItem('blogUser');
			return null;
		default:
			return state;
	}
};

export default userReducer;
