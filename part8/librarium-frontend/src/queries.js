import { gql } from '@apollo/client'

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
	query {
		allBooks {
			title
			author
			published
		}
	}
`

export const ADD_NEW_BOOK = gql`
	mutation addNewBook(
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
			author
			genres
		}
	}
`
