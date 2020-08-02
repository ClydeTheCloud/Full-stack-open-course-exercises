import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { userLogin } from '../reducers/userReducer'
import {
	messangerCreate,
	messangeHandler,
} from '../reducers/notificationReducer'

const LoginForm = () => {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()

	const handleLogin = async event => {
		event.preventDefault()
		try {
			await dispatch(userLogin(login, password))
			setLogin('')
			setPassword('')
		} catch (exception) {
			dispatch(
				messangeHandler(
					messangerCreate('Wrong login or password', 'error')
				),
				5
			)
		}
	}

	return (
		<form onSubmit={handleLogin}>
			<h2>Please, log in:</h2>
			<label>
				Login:
				<input
					id='login'
					type='text'
					value={login}
					name='Login'
					onChange={event => {
						setLogin(event.target.value)
					}}></input>
			</label>
			<br />
			<label>
				Password:
				<input
					id='password'
					type='password'
					value={password}
					name='password'
					onChange={event => {
						setPassword(event.target.value)
					}}></input>
			</label>
			<br />
			<button id='login-button' type='submit'>
				login
			</button>
		</form>
	)
}

export default LoginForm
