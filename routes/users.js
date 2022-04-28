const auth = require('../middleware/auth');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validateUser } = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/:me', auth, async (req, res) => {
	// JWT - user._id
	const user = await User.findById(req.user._id).select('-password'); // Exclude password
	res.send(user);
});

router.post('/', async (req, res) => {
	const validate = validateUser(req.body);
	if (validate) return res.status(400).send(validate.error);

	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('User already registered.');

	user = new User(_.pick(req.body, ['name', 'email', 'password']));
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	await user.save();

	const token = user.generateAuthToken();
	res
		.header('x-auth-token', token)
		.send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
