import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BIRTH_YEAR, AUTHORS_QUERY } from '../queries'

const Authors = props => {
	const [name, setName] = useState('')
	const [born, setBorn] = useState('')

	const [changeYear] = useMutation(EDIT_BIRTH_YEAR, {
		refetchQueries: [{ query: AUTHORS_QUERY }],
	})

	if (!props.show) {
		return null
	}

	if (props.authors.loading) {
		return <div>Loading...</div>
	}

	const handleChange = async event => {
		event.preventDefault()

		changeYear({ variables: { name, setBornTo: parseInt(born) } })

		setName('')
		setBorn('')
	}

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{props.authors.data.allAuthors.map(a => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<h3>Set birthyear</h3>
			<form onSubmit={handleChange}>
				<select onChange={e => setName(e.target.value)} value={name}>
					{props.authors.data.allAuthors.map(a => (
						<option value={a.name}>{a.name}</option>
					))}
				</select>

				<label>
					born:{' '}
					<input
						onChange={e => setBorn(e.target.value)}
						type="number"
						value={born}
					/>
				</label>
				<button type="submit">change</button>
			</form>
		</div>
	)
}

export default Authors
