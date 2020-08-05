import React from 'react'
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'

function User({ user }) {
	return (
		<tr className="hover:bg-purple-800 hover:text-white">
			<td>
				<Link to={`/users/${user.id}`}>
					<div className="p-6 w-full h-full">{user.displayName}</div>
				</Link>
			</td>
			<td>
				<Link to={`/users/${user.id}`}>
					<div className="p-6 w-full h-full">{user.blogs.length}</div>
				</Link>
			</td>
		</tr>
	)
}

function UsersComponent() {
	const userList = useSelector(state => state.userList)

	return (
		<>
			<h3>Users:</h3>
			<table className="p-6 rounded-md bg-purple-200 w-full text-center overflow-hidden">
				<tbody>
					<tr>
						<th className="p-6 w-1/2">User name</th>
						<th className="p-6 w-1/2">blogs created</th>
					</tr>
					{userList.map(u => (
						<User user={u} key={u.login} />
					))}
				</tbody>
			</table>
		</>
	)
}

export default UsersComponent
