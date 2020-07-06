const supertest = require('supertest');
const { app, mongooseTestInterface } = require('../app');
const Blog = require('../models/blog');
const api = supertest(app);
const helpers = require('./api_test_helpers');

describe('Blogs API tests', () => {
	beforeAll(async () => {
		await mongooseTestInterface.connect();
	});

	afterAll(async () => {
		await mongooseTestInterface.disconnect();
	});

	beforeEach(async () => {
		await Blog.deleteMany({});

		let blogObject = new Blog(helpers.initialBlogs[0]);
		await blogObject.save();

		blogObject = new Blog(helpers.initialBlogs[1]);
		await blogObject.save();
	});

	describe('GET method tests', () => {
		test('blogs are returned as JSON', async () => {
			await api
				.get('/api/blogs/')
				.expect(200)
				.expect('Content-type', /application\/json/);
		});

		test('id property is present in blogs', async () => {
			const blogs = await api.get('/api/blogs/');

			blogs.body.forEach((blog) => {
				expect(blog.id).toBeDefined();
			});
		});
	});

	describe('POST method tests', () => {
		test('posting blog is successful, blog is saved into DB', async () => {
			const newBlog = {
				title: 'Test 3',
				author: 'Tester number 2',
				url: 'http://www.test.tester/blog/3',
				likes: 6,
			};

			await api
				.post('/api/blogs/')
				.send(newBlog)
				.expect(201)
				.expect('Content-type', /application\/json/);

			const allBlogs = await helpers.getBlogsFromDB();
			expect(allBlogs).toHaveLength(helpers.initialBlogs.length + 1);
			expect(allBlogs).toEqual(expect.arrayContaining([expect.objectContaining(newBlog)]));
		});

		test('if likes property on blog object is missing default value of 0 is set', async () => {
			const newBlogWithoutLikesProp = {
				title: 'Test 4',
				author: 'Another test author',
				url: 'http://www.test.tester/blog/4',
			};

			await api
				.post('/api/blogs/')
				.send(newBlogWithoutLikesProp)
				.expect(201)
				.expect('Content-type', /application\/json/);

			const allBlogs = await helpers.getBlogsFromDB();
			allBlogs.forEach((blog) => expect(blog).toHaveProperty('likes'));
		});

		test('if author or URL property on blog object is missing "400 Bad Request" is returned', async () => {
			const newBlogWithoutAuthorProp = {
				title: 'Test 5',
				url: 'http://www.test.tester/blog/5',
				likes: 3,
			};

			const newBlogWithoutUrlProp = {
				title: 'Test 6',
				author: 'Another test author',
				likes: 9,
			};

			await api.post('/api/blogs/').send(newBlogWithoutAuthorProp).expect(400);

			await api.post('/api/blogs/').send(newBlogWithoutUrlProp).expect(400);

			const allBlogs = await helpers.getBlogsFromDB();

			expect(allBlogs.length).toBe(helpers.initialBlogs.length);
		});
	});

	describe('DELETE method tests', () => {
		test('blog can be deleted', async () => {
			const allBlogs = await helpers.getBlogsFromDB();

			const deletingThisBlog = allBlogs[0];

			await api.delete(`/api/blogs/${deletingThisBlog.id}`).expect(204);

			const allBlogsAfterDeleting = await helpers.getBlogsFromDB();
			expect(allBlogsAfterDeleting).toEqual(expect.not.arrayContaining([deletingThisBlog]));

			expect(allBlogsAfterDeleting.length).toBe(helpers.initialBlogs.length - 1);
		});
	});

	describe('PUT method tests', () => {
		test('blog can be updated', async () => {
			const allBlogs = await helpers.getBlogsFromDB();
			const updatedBlog = allBlogs[0];
			updatedBlog.likes = 99999;

			await api.put(`/api/blogs/${updatedBlog.id}`).send(updatedBlog).expect(200);

			const allBlogsUpdated = await helpers.getBlogsFromDB();
			expect(allBlogsUpdated[0].likes).toBe(99999);
		});
	});
});
