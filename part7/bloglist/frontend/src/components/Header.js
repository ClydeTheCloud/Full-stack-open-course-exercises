import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { userLogout } from '../reducers/userReducer'

function Header() {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)

	const handleLogOut = () => {
		dispatch(userLogout())
	}

	const userControls = () => {
		return (
			<>
				<span className="mr-6 text-white">
					Welcome back, {user.displayName}
				</span>
				<button
					className="btn btn-menu mr-6"
					id={'logout-button'}
					onClick={handleLogOut}
				>
					Log Out
				</button>
			</>
		)
	}
	return (
		<header className="p-3 bg-purple-500">
			<div className="container mx-auto flex justify-between">
				<div>
					<Link className="btn btn-menu mx-6 inline-block" to="/">
						Home
					</Link>
					<Link
						className="btn btn-menu mr-6 inline-block"
						to="/users"
					>
						Users
					</Link>
				</div>

				<div>
					{user ? (
						userControls()
					) : (
						<p className="mr-6 text-white">please, log in</p>
					)}
				</div>
			</div>
		</header>
	)
}

export default Header
