require('dotenv').config()
const { ApolloServer, UserInputError, gql, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const JWT = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const DataLoader = require('dataloader')

const pubsub = new PubSub()

mongoose.set('useFindAndModify', false)

console.log('connecting to', process.env.MONGO_URI)

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch(error => {
		console.log('error connection to MongoDB:', error.message)
	})

const typeDefs = gql`
	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
		me: User
	}

	type Subscription {
		bookAdded: Book!
	}

	type Book {
		title: String!
		published: Int!
		author: Author!
		genres: [String!]!
		id: ID!
	}

	type Author {
		name: String!
		born: Int
		bookCount: Int!
	}

	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}

	type Token {
		value: String!
	}
	type Mutation {
		addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String!]!
		): Book
		editAuthor(name: String!, setBornTo: Int!): Author
		clear: Book
		createUser(username: String!, favoriteGenre: String!): User
		login(username: String!, password: String!): Token
	}
`

const batchAuthors = async keys => {
	const authors = await Author.find({
		name: {
			$in: keys,
		},
	})
	return keys.map(key => authors.find(author => author.name === key))
}

const batchBooks = async keys => {
	const books = await Book.find({
		author: {
			$in: keys,
		},
	})
	return keys.map(key => {
		const filteredArray = books.filter(
			b => b.author.toString() === key.toString()
		)
		return filteredArray.length
	})
}

const resolvers = {
	Query: {
		bookCount: () => Book.collection.countDocuments(),
		authorCount: () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			if (!args.author && !args.genre) {
				return Book.find({}).populate('author')
			} else if (!args.author && args.genre) {
				return Book.find({ genres: { $in: [args.genre] } }).populate(
					'author'
				)
			} else if (args.author && !args.genre) {
				const authorToFind = await Author.findOne({ name: args.author })
				return Book.find({ author: authorToFind._id }).populate(
					'author'
				)
			} else if (args.author && args.genre) {
				const authorToFind = await Author.findOne({ name: args.author })
				return Book.find({
					author: authorToFind._id,
					genres: { $in: [args.genre] },
				}).populate('author')
			}
		},
		allAuthors: () => {
			return Author.find({})
		},
		me: (root, args, context) => {
			return context.currentUser
		},
	},
	Author: {
		bookCount: async (root, args, context, info) => {
			const authorToFind = await context.loaders.author.load(root.name)
			return context.loaders.book.load(authorToFind._id)
		},
	},
	Mutation: {
		addBook: async (root, args, context) => {
			if (!context.currentUser) {
				throw new UserInputError('Please, log in.')
			}
			const newBookAuthor = await Author.findOne({ name: args.author })

			let newAuthor
			if (!newBookAuthor) {
				newAuthor = new Author({ name: args.author })
				try {
					await newAuthor.save()
				} catch (e) {
					throw new UserInputError(e.message, { invalidArgs: args })
				}
			}

			const newBook = new Book({
				...args,
				author: newAuthor ? newAuthor._id : newBookAuthor._id,
			})

			try {
				await newBook.save()
			} catch (e) {
				throw new UserInputError(e.message, { invalidArgs: args })
			}

			await newBook.populate('author').execPopulate()

			pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
			return newBook
		},
		clear: async (root, args) => {
			await Book.deleteMany({})
			await Author.deleteMany({})
		},
		editAuthor: async (root, args, context) => {
			if (!context.currentUser) {
				throw new UserInputError('Please, log in.')
			}
			const authorToEdit = await Author.findOne({ name: args.name })
			if (!authorToEdit) {
				return null
			}

			authorToEdit.born = args.setBornTo

			try {
				await authorToEdit.save()
			} catch (e) {
				throw new UserInputError(e.message, { invalidArgs: args })
			}
			return authorToEdit
		},
		createUser: (root, args) => {
			const newUser = new User({ username: args.username })

			return newUser.save().catch(e => {
				throw new UserInputError(e.message, {
					invalidArgs: args,
				})
			})
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username })

			if (!user || args.password !== '111') {
				throw new UserInputError('Wrong login or password')
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			}

			return { value: JWT.sign(userForToken, process.env.JWT_SECRET) }
		},
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
		},
	},
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const auth = req ? req.headers.authorization : null
		let currentUser
		if (auth && auth.toLowerCase().startsWith('bearer ')) {
			const decodedToken = JWT.verify(
				auth.substring(7),
				process.env.JWT_SECRET
			)
			currentUser = await User.findById(decodedToken.id)
		}
		const loaders = {
			author: new DataLoader(keys => batchAuthors(keys)),
			book: new DataLoader(keys => batchBooks(keys)),
		}
		return { currentUser, loaders }
	},
})

server.listen().then(({ url, subscriptionsUrl }) => {
	console.log(`Server ready at ${url}`)
	console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
