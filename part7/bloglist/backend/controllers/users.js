const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (req, res) => {
	const body = req.body;

	const passRegExp = /^[A-Za-z0-9]+$/;

	if (body.password.length < 3) {
		return res.status(422).json({
			error: 'Password too short. Minimum required length is 3.',
		});
	} else if (body.login.length < 3) {
		return res.status(422).json({
			error: 'Login too short. Minimum required length is 3.',
		});
	} else if (!body.password.match(passRegExp)) {
		return res.status(422).json({
			error: 'Invalid password. Only letters and numbers are allowed.',
		});
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(body.password, saltRounds);

	const user = new User({
		login: body.login,
		displayName: body.displayName,
		passwordHash,
	});

	const savedUser = await user.save();

	res.json(savedUser);
});

usersRouter.get('/', async (req, res) => {
	const allUsers = await User.find({}).populate('blogs', {
		url: 1,
		title: 1,
		author: 1,
	});
	res.json(allUsers.map(u => u.toJSON()));
});

module.exports = usersRouter;
