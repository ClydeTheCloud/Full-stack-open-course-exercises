import React, { useState } from 'react'
import PropTypes from 'prop-types'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ setUser, messageUpdater }) => {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async event => {
		event.preventDefault()
		try {
			const newUser = await loginService.login({ login, password })
			setLogin('')
			setPassword('')
			setUser(newUser)
			blogService.setToken(newUser)
			window.localStorage.setItem('blogUser', JSON.stringify(newUser))
		} catch (exception) {
			messageUpdater('Wrong login or password', 'error')
		}
	}

	return (
		<form onSubmit={handleLogin}>
			<h2>Please, log in:</h2>
			<label>
				Login:
				<input
					id="login"
					type="text"
					value={login}
					name="Login"
					onChange={event => {
						setLogin(event.target.value)
					}}
				></input>
			</label>
			<br />
			<label>
				Password:
				<input
					id="password"
					type="password"
					value={password}
					name="password"
					onChange={event => {
						setPassword(event.target.value)
					}}
				></input>
			</label>
			<br />
			<button id="login-button" type="submit">
				login
			</button>
		</form>
	)
}

LoginForm.propTypes = {
	setUser: PropTypes.func.isRequired,
	messageUpdater: PropTypes.func.isRequired,
}

export default LoginForm
