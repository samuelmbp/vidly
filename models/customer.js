const Joi = require('joi');
const mongoose = require('mongoose');

const customersSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 55,
	},

	phone: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 55,
	},

	isGold: {
		type: Boolean,
		default: false,
	},
});

const Customer = mongoose.model('Customer', customersSchema);

const validateCustomer = (customer) => {
	const schema = {
		name: Joi.string().min(5).max(55).required(),
		phone: Joi.string().min(5).max(55).required(),
		isGold: Joi.boolean(),
	};

	return Joi.validate(customer, schema, (err, value) => {});
};

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;
