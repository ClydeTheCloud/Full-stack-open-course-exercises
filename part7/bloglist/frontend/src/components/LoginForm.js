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
		<form
			onSubmit={handleLogin}
			className="p-5 rounded-lg FormSvgBg text-center"
		>
			<div className="max-w-2xl mx-auto rounded-md bg-purple-500 text-white p-6">
				<h2 className="mb-5 bold text-2xl">Please, log in:</h2>
				<label>
					<p className="mb-5 text-xl">Login:</p>
					<input
						className="p-1 border rounded border-purple-800 w-full mb-5 text-black"
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
					<p className="mb-5 text-xl">Password: </p>
					<input
						className="p-1 border rounded border-purple-800 w-full mb-5 text-black"
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
				<button
					className="btn bg-blue-800 text-white hover:bg-purple-600 mx-auto w-40 block"
					id="login-button"
					type="submit"
				>
					login
				</button>
			</div>
		</form>
	)
}

export default LoginForm
