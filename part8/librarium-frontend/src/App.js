import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { useQuery } from '@apollo/client'
import { BOOKS_QUERY, AUTHORS_QUERY } from './queries'

const App = () => {
	const [page, setPage] = useState('authors')
	const books = useQuery(BOOKS_QUERY)
	const authors = useQuery(AUTHORS_QUERY)

	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				<button onClick={() => setPage('add')}>add book</button>
			</div>

			<Authors show={page === 'authors'} authors={authors} />

			<Books show={page === 'books'} books={books} />

			<NewBook show={page === 'add'} />
		</div>
	)
}

export default App
