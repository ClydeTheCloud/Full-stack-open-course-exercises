import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_GENRES } from '../queries'

const Books = props => {
	const genres = useQuery(GET_ALL_GENRES)
	const genresSet = new Set()
	const genreButtons = []
	useEffect(() => {}, [genres])
	if (!props.show) {
		return null
	}

	if (props.books.loading) {
		return <div>Loading...</div>
	}

	if (!genres.loading) {
		genres.data.allBooks.forEach(b => {
			b.genres.forEach(g => {
				genresSet.add(g)
			})
		})

		genresSet.forEach(g => {
			genreButtons.push(
				<button key={g} onClick={() => props.setFilter(g)}>
					{g}
				</button>
			)
		})
	}

	return (
		<div>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{props.books.data.allBooks.map(a => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
			<br />
			<div>
				{genreButtons}
				<button onClick={() => props.setFilter(null)}>
					All Genres
				</button>
			</div>
		</div>
	)
}

export default Books
