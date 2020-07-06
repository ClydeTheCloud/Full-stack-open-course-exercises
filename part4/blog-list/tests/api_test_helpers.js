const Blog = require('../models/blog');
const User = require('../models/user');

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

const initialUsers = [
	{
		login: 'TESTER1',
		displayName: 'display tester 1',
		password: '111',
	},
	{
		login: 'TESTER2',
		displayName: 'display tester 2',
		password: '222',
	},
];

const getBlogsFromDB = async () => {
	const response = await Blog.find({});
	return response.map((r) => r.toJSON());
};

const getUsersFromDB = async () => {
	const response = await User.find({});
	return response.map((r) => r.toJSON());
};

module.exports = { initialBlogs, getBlogsFromDB, initialUsers, getUsersFromDB };
