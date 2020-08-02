import React from 'react'

function User({ user }) {
	return (
		<tr>
			<td>{user.displayName}</td>
			<td>{user.blogs.length}</td>
		</tr>
	)
}

export default User
