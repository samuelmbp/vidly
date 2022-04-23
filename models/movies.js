const Joi = require('joi');
const mongoose = require('mongoose');

const moviesSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 55,
	},
	genre: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Genre',
	},
	numberInStock: Number,
	dailyRentalRate: Number,
});

const Movie = mongoose.model('Movie', moviesSchema);

function validateMovie(movie) {
	const schema = {
		name: Joi.string().min(3).required(),
		numberInStock: Joi.number(),
		dailyRentalRate: Joi.number,
	};

	return Joi.validate(movie, schema, (err, value) => {});
}

module.exports.Movie = Movie;
