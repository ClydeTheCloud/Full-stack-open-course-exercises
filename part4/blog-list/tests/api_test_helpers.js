const Blog = require('../models/blog');

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

const getBlogsFromDB = async () => {
	const response = await Blog.find({});
	return response.map(r => r.toJSON());
};

module.exports = { initialBlogs, getBlogsFromDB };
