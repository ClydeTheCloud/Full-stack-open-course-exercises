require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test' || 'jest') {
	MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
	MONGODB_URI,
	PORT,
}