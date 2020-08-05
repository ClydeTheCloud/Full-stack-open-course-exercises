const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({}).populate('creator', {
		login: 1,
		displayName: 1,
	})
	res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
	if (!req.token) {
		return res.status(401).json({ error: 'token missing' })
	}

	const decodedToken = jwt.verify(req.token, process.env.SECRET)
	if (!decodedToken) {
		return res.status(401).json({ error: 'token invalid' })
	}

	const user = await User.findById(decodedToken.id)

	const blog = new Blog({
		title: req.body.title,
		author: req.body.author,
		url: req.body.url,
		likes: req.body.likes,
		creator: user._id,
	})

	const savedBlog = await (await blog.save()).execPopulate('creator', {
		login: 1,
		displayName: 1,
	})

	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	res.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (req, res) => {
	if (!req.token) {
		return res.status(401).json({ error: 'token missing' })
	}
	const decodedToken = jwt.verify(req.token, process.env.SECRET)
	if (!decodedToken) {
		return res.status(401).json({ error: 'token invalid' })
	}

	const blogToDelete = await Blog.findById(req.params.id)

	if (blogToDelete.creator.toString() === decodedToken.id.toString()) {
		await Blog.findByIdAndDelete(req.params.id)
		// blogToDelete.deleteOne();
		return res.status(204).end()
	}

	res.status(401).end()
})

blogsRouter.put('/:id', async (req, res) => {
	const blog = {
		likes: req.body.likes,
	}

	const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
		new: true,
	}).populate('creator', {
		login: 1,
		displayName: 1,
	})

	res.json(updatedBlog.toJSON())
})

//Add a new comment on blog
blogsRouter.post('/:id/comments/', async (req, res) => {
	const blog = await Blog.findById(req.params.id).populate('creator', {
		login: 1,
		displayName: 1,
	})

	blog.comments.push(req.body.comment)

	await Blog.updateOne({ _id: blog._id }, blog)
	res.status(201).json(blog.toJSON())
})

module.exports = blogsRouter
