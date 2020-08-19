import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'

import {
	useQuery,
	useApolloClient,
	useLazyQuery,
	useSubscription,
} from '@apollo/client'
import {
	BOOKS_QUERY,
	AUTHORS_QUERY,
	BOOK_ADDED,
	GET_ALL_GENRES,
} from './queries'

const App = () => {
	const [page, setPage] = useState('authors')
	const [token, setToken] = useState(null)
	const [filter, setFilter] = useState(null)
	const [getBooks, books] = useLazyQuery(BOOKS_QUERY)
	const authors = useQuery(AUTHORS_QUERY)
	const client = useApolloClient()

	useEffect(() => {
		if (!token) {
			const storedToken = localStorage.getItem('librarium-user')
			if (storedToken) {
				setToken(storedToken)
			}
		}
	}, []) //eslint-disable-line

	useEffect(() => {
		getBooks({
			variables: {
				genre: filter,
			},
		})
	}, [filter]) //eslint-disable-line

	const updateBookCacheWith = addedBook => {
		const includedIn = (set, object) => {
			set.map(b => b.id).includes(object.id)
		}

		const booksInStore = client.readQuery({
			query: BOOKS_QUERY,
			variables: { genre: null },
		})

		const genresInStore = client.readQuery({
			query: GET_ALL_GENRES,
		})

		const addedBook_GENRES = {
			genres: addedBook.genres,
		}

		if (!includedIn(booksInStore.allBooks, addedBook)) {
			client.writeQuery({
				query: BOOKS_QUERY,
				data: { allBooks: booksInStore.allBooks.concat(addedBook) },
				variables: { genre: null },
			})
			client.writeQuery({
				query: GET_ALL_GENRES,
				data: {
					allBooks: genresInStore.allBooks.concat(addedBook_GENRES),
				},
			})
		}
	}

	useSubscription(BOOK_ADDED, {
		onSubscriptionData: ({ subscriptionData }) => {
			const addedBook = subscriptionData.data.bookAdded
			updateBookCacheWith(addedBook)
		},
	})

	useEffect(() => {
		setFilter(null)
	}, [page])

	const handleLogout = () => {
		setToken(null)
		localStorage.removeItem('librarium-user')
		client.resetStore()
	}

	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				{token ? (
					<>
						<button onClick={() => setPage('add')}>add book</button>
						<button onClick={() => setPage('recommended')}>
							recommended
						</button>
						<button onClick={handleLogout}>log out</button>
					</>
				) : (
					<button onClick={() => setPage('login')}>log in</button>
				)}
			</div>

			<Authors show={page === 'authors'} authors={authors} />

			<Books
				show={page === 'books'}
				books={books}
				filter={filter}
				setFilter={setFilter}
			/>

			<NewBook show={page === 'add'} />

			<Recommended show={page === 'recommended'} books={books} />

			<LoginForm
				show={page === 'login'}
				setToken={setToken}
				setPage={setPage}
			/>
		</div>
	)
}

export default App
