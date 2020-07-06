// TODO add test for checking that invalid users are not created and suited status code returned
// TODO add test for checking that duplicate users are not created
// TODO add test for checking that valid user can be created
// TODO Test for login with valid credentials
// TODO Test for login with invalid credentials

const supertest = require('supertest');
const { app, mongooseTestInterface } = require('../app');
const User = require('../models/user');
const api = supertest(app);
const helpers = require('./api_test_helpers');

beforeAll(async () => {
	await mongooseTestInterface.connect();
});

afterAll(async () => {
	await mongooseTestInterface.disconnect();
});

beforeEach(async () => {
	await User.deleteMany({});
	await api.post('/api/users/').send(helpers.initialUsers[0]);
	await api.post('/api/users/').send(helpers.initialUsers[1]);
});

describe('Users API tests', () => {
	test('users are returned as JSON', async () => {
		await api
			.get('/api/users/')
			.expect(200)
			.expect('Content-type', /application\/json/);
	});

	test('users are valid', async () => {
		const allUsers = await helpers.getUsersFromDB();

		allUsers.forEach((user) => {
			expect(user).toHaveProperty('login');
			expect(user).toHaveProperty('displayName');
			expect(user).toHaveProperty('blogs');
			expect(user).toHaveProperty('id');
		});
		expect(allUsers).toHaveLength(helpers.initialUsers.length);
	});

	test('users with invalid credentials are not created', () => {
		const invalidUsers = {
			shortPass: {
				login: 'TESTER3',
				displayName: 'display tester 3',
				password: 'a',
			},
			shortLogin: {
				login: 'T4',
				displayName: 'display tester 4',
				password: '111',
			},
			invalidPass: {
				login: 'TESTER5',
				displayName: 'display tester 5',
				password: '-=!|unacceptable|!=-',
			},
			invalidLogin: {
				login: '-=!|TESTER6|!=-',
				displayName: 'display tester 6',
				password: '111',
			},
		};
	});
});
