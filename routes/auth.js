const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
	const validate = validateAuth(req.body);
	if (validate) return res.status(400).send(validate.error);

	let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Invalid email or password.');

	// Compare the text password with the hashed password when authenticating
	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send('Invalid email or password.');

	// JWT
	const token = user.generateAuthToken();
	res.send(token);
});

const validateAuth = (req) => {
	const schema = {
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required(),
	};

	return Joi.validate(req, schema, (err, result) => {});
};
module.exports = router;
