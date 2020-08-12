import { gql } from '@apollo/client'

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
			title
			author {
				name
			}
			published
			genres
		}
	}
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
			title
			published
			author {
				name
			}
			genres
		}
	}
`

export const EDIT_BIRTH_YEAR = gql`
	mutation editBirthYear($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			name
			born
		}
	}
`
