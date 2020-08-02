import React, { useState, useEffect } from 'react'

import usersService from '../services/users'
import User from './User'

function UsersComponent() {
	const [users, setUsers] = useState([])

	useEffect(() => {
		usersService.getAll().then(u => {
			setUsers(u)
		})
	}, [])

	return (
		<div>
			<h3>Users:</h3>
			<table>
				<tbody>
					<tr>
						<th>User name</th>
						<th>blogs created</th>
					</tr>
					{users.map(u => (
						<User user={u} key={u.login} />
					))}
				</tbody>
			</table>
		</div>
	)
}

export default UsersComponent
