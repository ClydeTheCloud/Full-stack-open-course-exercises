import React from 'react'
import { useQuery } from '@apollo/client'
import { FAVORITE_GENRE } from '../queries'

function Recommended(props) {
	const user = useQuery(FAVORITE_GENRE)

	if (!props.show) {
		return null
	}

	const recomendations = props.books.data.allBooks.filter(b =>
		b.genres.includes(user.data.me.favoriteGenre)
	)

	return (
		<div>
			<h3>Books recommended 4 u</h3>
			<p>
				<i>based on your favorite genre </i>
				<b>({user.data.me.favoriteGenre})</b>
			</p>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{recomendations.length > 0 ? (
						recomendations.map(book => (
							<tr key={book.title}>
								<td>{book.title}</td>
								<td>{book.author.name}</td>
								<td>{book.published}</td>
							</tr>
						))
					) : (
						<tr>
							<td rowSpan="3">
								Sorry, no recommendations 4 u :'c
							</td>
						</tr>
					)}
				</tbody>
			</table>

			<ul></ul>
		</div>
	)
}

export default Recommended
