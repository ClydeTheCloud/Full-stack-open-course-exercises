const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

// TODO convert 'request' and 'response' to 'req' and 'res' EVERYWHERE

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('creator', {
		login: 1,
		displayName: 1,
	});
	response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
	if (!request.token) {
		return response.status(401).json({ error: 'token missing' });
	}

	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (!decodedToken) {
		return response.status(401).json({ error: 'token invalid' });
	}

	const user = await User.findById(decodedToken.id);

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
	if (!req.token) {
		return res.status(401).json({ error: 'token missing' });
	}

	const decodedToken = jwt.verify(req.token, process.env.SECRET);
	if (!decodedToken) {
		return res.status(401).json({ error: 'token invalid' });
	}

	const blogToDelete = await Blog.findById(req.params.id);

	if (blogToDelete.creator.toString() === decodedToken.id.toString()) {
		blogToDelete.deleteOne();
		return res.status(204).end();
	}

	res.status(401).end();
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
