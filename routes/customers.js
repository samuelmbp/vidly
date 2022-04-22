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
		minLength: 5,
		maxLength: 55,
	},

	isGold: {
		type: Boolean,
		default: false,
	},
});

const Customer = mongoose.model('Customer', customersSchema);

router.get('/', async (req, res) => {
	const customer = await Customer.find();
	res.send(customer);
});

router.get('/:id', async (req, res) => {
	const customer = await Customer.findById(req.params.id);
	if (!customer)
		res.status(404).send('The customer with the given ID does was not found.');
	res.send(customer);
});

router.post('/', async (req, res) => {
	const validate = validateCustomer(req.body);
	if (validate) return res.status(400).send(validate.error);

	let customer = new Customer({
		name: req.body.name,
		phone: req.body.phone,
		isGold: req.body.isGold,
	});

	customer = await customer.save();
	res.send(customer);
});

router.put('/:id', async (req, res) => {
	const validate = validateCustomer(req.body);
	if (validate) return res.status(400).send(validate.error);

	const customer = await Customer.findByIdAndUpdate(req.params.id, {
		name: req.body.name,
		phone: req.body.phone,
		isGold: req.body.isGold,
	});

	if (!customer)
		return res
			.status(404)
			.send('The customer with the given ID was not found.');

	res.send(customer);
});

router.delete('/:id', async (req, res) => {
	const customer = await Customer.findByIdAndDelete(req.params.id);
	if (!customer)
		return res
			.status(404)
			.send('The customer with the given ID was not found.');
	res.send(customer);
});

const validateCustomer = (customer) => {
	const schema = {
		name: Joi.string().min(5).max(55).required(),
		phone: Joi.string().min(5).max(55).required(),
		isGold: Joi.boolean(),
	};

	return Joi.validate(customer, schema, (err, value) => {});
};

module.exports = router;
