const _ = require('lodash');
const { User, validateUser } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
	const validate = validateUser(req.body);
	if (validate) return res.status(400).send(validate.error);

	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('User already registered.');

	user = new User(_.pick(req.body, ['name', 'email', 'password']));

	await user.save();
	res.send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
