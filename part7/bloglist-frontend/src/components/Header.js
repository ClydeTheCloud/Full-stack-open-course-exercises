import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { userLogout } from '../reducers/userReducer'
import Messanger from './Messanger'

function Header() {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)

	const handleLogOut = () => {
		dispatch(userLogout())
	}

	const userControls = () => {
		return (
			<>
				<h3>Logged in as {user.displayName}</h3>
				<button id={'logout-button'} onClick={handleLogOut}>
					Log Ou
				</button>
			</>
		)
	}
	return (
		<header>
			<div>
				<Link to='/'>Home</Link>
				<Link to='/users'>Users</Link>
			</div>
			{user ? userControls() : 'please, log in'}
			<hr />
			<Messanger />
		</header>
	)
}

export default Header
