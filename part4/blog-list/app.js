const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const logger = require('./utils/logger');
const config = require('./utils/config');
const blogsRouter = require('./controllers/blogs');
const middleware = require('./utils/middleware');

logger.info('connecting to mongoDB');
mongoose
	.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => logger.info('connected to mongoDB'))
	.catch((error) => logger.error('connection failed', error));

app.use(cors());
app.use(express.json());
app.use('/api/blogs/', blogsRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
