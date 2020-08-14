import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
	fragment BookDetails on Book {
		title
		author {
			name
		}
		published
		genres
		id
	}
`

export const BOOK_ADDED = gql`
	subscription {
		bookAdded {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`

export const FAVORITE_GENRE = gql`
	query {
		me {
			favoriteGenre
		}
	}
`

export const LOG_IN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`

export const GET_ALL_GENRES = gql`
	query {
		allBooks {
			genres
		}
	}
`

export const AUTHORS_QUERY = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`

export const BOOKS_QUERY = gql`
	query allBooks($genre: String) {
		allBooks(genre: $genre) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`

export const ADD_NEW_BOOK = gql`
	mutation addBook(
		$title: String!
		$published: Int!
		$author: String!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			published: $published
			author: $author
			genres: $genres
		) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`

export const EDIT_BIRTH_YEAR = gql`
	mutation editBirthYear($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			name
			born
		}
	}
`
