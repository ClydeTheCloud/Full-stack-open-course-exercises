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

	test('valid users are created', async () => {
		const validUser = {
			login: 'ThisIsFine',
			displayName: 'Valid User',
			password: '1234567890',
		};

		await api.post('/api/users/').send(validUser).expect(200);

		const allUsersAfterTest = await helpers.getUsersFromDB();

		expect(allUsersAfterTest).toHaveLength(helpers.initialUsers.length + 1);
	});

	test('users with invalid credentials are not created', async () => {
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

		await api.post('/api/users/').send(invalidUsers.shortPass).expect(422);

		await api.post('/api/users/').send(invalidUsers.shortLogin).expect(422);

		await api.post('/api/users/').send(invalidUsers.invalidPass).expect(422);

		await api.post('/api/users/').send(invalidUsers.invalidLogin).expect(400);

		const allUsersAfterTest = await helpers.getUsersFromDB();

		expect(allUsersAfterTest).toHaveLength(helpers.initialUsers.length);
	});

	test('login of users should be unique', async () => {
		const duplicatedUsers = [
			{
				login: 'DUPLICATE',
				displayName: 'First of his name',
				password: '111',
			},
			{
				login: 'DUPLICATE',
				displayName: 'duplicated',
				password: '111',
			},
		];

		await api.post('/api/users/').send(duplicatedUsers[0]).expect(200);
		await api.post('/api/users/').send(duplicatedUsers[1]).expect(400);

		const allUsersAfterTest = await helpers.getUsersFromDB();

		expect(allUsersAfterTest).toHaveLength(helpers.initialUsers.length + 1);
	});
});

describe('login API tests', () => {
	test('login operation with valid credentials is successful', async () => {
		const response = await api.post('/api/login/').send(helpers.loginInfo);

		expect(response.body).toHaveProperty('token');
		expect(response.body).toHaveProperty('login');
		expect(response.body).toHaveProperty('displayName');
	});

	test('login operation with invalid credentials is not successful', async () => {
		const wrongLogin = {
			login: 'NONEXISTING',
			password: '111',
		};
		const wrongPassword = {
			login: 'TESTER1',
			password: 'NONEXISTING',
		};
		await api.post('/api/login/').send(wrongLogin).expect(401);
		await api.post('/api/login/').send(wrongPassword).expect(401);
	});
});
