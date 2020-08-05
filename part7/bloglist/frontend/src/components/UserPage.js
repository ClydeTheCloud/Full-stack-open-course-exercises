import React from 'react'

function UserPage({ user }) {
	if (!user) {
		return <div>Loading...</div>
	}
	return (
		<div className="container m-auto p-3">
			<h4 className="mb-6 px-3 font-semibold text-xl">Added blogs:</h4>
			<ul>
				{user.blogs.map(b => (
					<li className="p-3 odd:bg-gray-300" key={b.url}>
						{b.title}
					</li>
				))}
			</ul>
		</div>
	)
}

export default UserPage
