const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

/**
 * Create the customersSchema
 * Create the customers model
 * Create Routes :
 *  // get
 * // post
 * // put
 * // delete
 */

const customersSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 5,
		maxLength: 55,
	},

	phone: {
		type: String,
		required: true,
		maxLength: 11,
	},

	isGold: {
		type: Boolean,
		required: true,
		maxLength: 5,
	},
});

const Customer = mongoose.model('Customer', customersSchema);

router.get('/', async (req, res) => {
	const customer = await Customer.find();
	res.send(customer);
});

module.exports = router;
