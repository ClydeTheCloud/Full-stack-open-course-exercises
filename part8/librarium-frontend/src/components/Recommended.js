import React, { useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { FAVORITE_GENRE, BOOKS_QUERY } from '../queries'

function Recommended(props) {
	const user = useQuery(FAVORITE_GENRE)
	const [getRecommendations, recommendations] = useLazyQuery(BOOKS_QUERY)

	useEffect(() => {
		if (!user.loading) {
			getRecommendations({
				variables: { genre: user.data.me.favoriteGenre },
			})
		}
	}, [user.loading])

	if (!props.show) {
		return null
	}

	if (recommendations.called && recommendations.loading) {
		return <div>Loading...</div>
	}

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
					{recommendations.data.allBooks.length > 0 ? (
						recommendations.data.allBooks.map(book => (
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
