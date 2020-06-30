const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const api = supertest(app);

const initialBlogs = [
	{
		title: 'Test 1',
		author: 'Tester',
		url: 'http://www.test.tester/blog/1',
		likes: 1,
	},
	{
		title: 'Test 2',
		author: 'Tester',
		url: 'http://www.test.tester/blog/2',
		likes: 3,
	},
];

beforeEach(async () => {
	await Blog.deleteMany({});

	let blogObject = new Blog(initialBlogs[0]);
	await blogObject.save();

	blogObject = new Blog(initialBlogs[1]);
	await blogObject.save();
});

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs/')
		.expect(200)
		.expect('Content-type', /application\/json/);
});

test('id property is present in blogs', async () => {
	const blogs = await api.get('/api/blogs/');

	blogs.body.forEach(blog => {
		expect(blog.id).toBeDefined();
	});
});

// WORK ON THIS
test('posting blog is successful', async () => {
	const newBlog = {
		title: 'Test 3',
		author: 'Tester number 2',
		url: 'http://www.test.tester/blog/3',
		likes: 6,
	};

	await api
		.post('/api/blogs/')
		.send(newBlog)
		.expect(200)
		.expect('Content-type', /application\/json/);
});
// WORK ON THIS

afterAll(() => {
	mongoose.connection.close();
});
