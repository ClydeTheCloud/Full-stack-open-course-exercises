import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOG_IN } from '../queries'

const LoginForm = props => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [loginOperation, result] = useMutation(LOG_IN)

	useEffect(() => {
		if (result.data) {
			localStorage.setItem('librarium-user', result.data.login.value)
		}
	}, [result.data]) //eslint-disable-line

	if (!props.show) {
		return null
	}

	const handleSubmit = async e => {
		e.preventDefault()

		const response = await loginOperation({
			variables: {
				username,
				password,
			},
		})
		console.log(response.data.login.value)
		props.setToken(response.data.login.value)
		props.setPage('books')
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>
				username:{' '}
				<input
					type="text"
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
			</label>
			<br />
			<label>
				password:{' '}
				<input
					type="password"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
			</label>
			<br />
			<button type="submit">Log in</button>
		</form>
	)
}

export default LoginForm
