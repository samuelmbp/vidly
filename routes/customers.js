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
		minLength: 9,
		maxLength: 14,
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

router.post('/', async (req, res) => {
	const validate = validateCustomer(req.body);
	if (validate) return res.status(400).send(validate.error);

	let customer = new Customer(req.body);
	customer = await customer.save();
	res.send(customer);
});

const validateCustomer = (customer) => {
	const schema = {
		name: Joi.string().min(3).required(),
		phone: Joi.string().min(6).required(),
		isGold: Joi.boolean().required(),
	};

	return Joi.validate(customer, schema, (err, value) => {});
};

module.exports = router;
