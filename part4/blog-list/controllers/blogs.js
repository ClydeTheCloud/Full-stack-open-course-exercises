const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('creator', { login: 1, displayName: 1 });
	response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
	const user = await User.findById(request.body.userId);

	const blog = new Blog({
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		likes: request.body.likes,
		creator: user._id,
	});

	const savedBlog = await blog.save();

	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();

	response.status(201).json(savedBlog.toJSON());
});

blogsRouter.delete('/:id', async (req, res) => {
	await Blog.findByIdAndRemove(req.params.id);
	res.status(204).end();
});

blogsRouter.put('/:id', async (req, res) => {
	const blog = {
		likes: req.body.likes,
	};

	const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
		new: true,
	});

	res.json(updatedBlog.toJSON());
});

module.exports = blogsRouter;
