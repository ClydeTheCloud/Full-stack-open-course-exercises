const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
	title: String,
	author: { type: String, required: true },
	url: { type: String, required: true },
	likes: { type: Number, default: 0 },
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	comments: [String],
})

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
