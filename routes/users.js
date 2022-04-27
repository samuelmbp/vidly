const { User, validateUser } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
	const validate = validateUser(req.body);
	if (validate) return res.status(400).send(validate.error);

	// When user already exists/registered in the db
	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('User already registered.');

	// When new user
	user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	});

	await user.save();
	res.send(user);
});

module.exports = router;
