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

afterAll(() => {
	mongoose.connection.close();
});
