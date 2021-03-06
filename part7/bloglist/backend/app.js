const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const testRouter = require('./controllers/test')
const middleware = require('./utils/middleware')

let mongooseTestInterface = {
	connect: () => {
		mongoose
			.connect(config.MONGODB_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
				useCreateIndex: true,
			})
			.catch(error => logger.error('connection failed', error))
	},
	disconnect: () => {
		mongoose.connection.close()
	},
}

if (process.env.NODE_ENV !== 'jest') {
	logger.info('connecting to mongoDB')
	mongoose
		.connect(config.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		})
		.then(() => logger.info('connected to mongoDB'))
		.catch(error => logger.error('connection failed', error))
}

app.use(cors())
app.use(express.json())
app.use(middleware.getTokenFromRequest)
app.use('/api/blogs/', blogsRouter)
app.use('/api/users/', usersRouter)
app.use('/api/login/', loginRouter)
if (process.env.NODE_ENV === 'test') {
	app.use('/api/test/', testRouter)
}
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = { app, mongooseTestInterface }
