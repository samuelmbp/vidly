const Joi = require('joi');
const mongoose = require('mongoose');
const { genresSchema } = require('./genres');

const moviesSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 5,
		maxlength: 255,
	},
	genre: {
		type: genresSchema,
		required: true,
	},
	numberInStock: {
		type: Number,
		required: true,
		min: 0,
		mx: 255,
	},
	dailyRentalRate: {
		type: Number,
		required: true,
		min: 0,
		max: 255,
	},
});

const Movie = mongoose.model('Movie', moviesSchema);

function validateMovie(movie) {
	const schema = {
		name: Joi.string().min(3).required(),
		genreId: Joi.string().required(),
		numberInStock: Joi.number().min(0).required(),
		dailyRentalRate: Joi.number().min(0).required(),
	};

	return Joi.validate(movie, schema, (err, value) => {});
}

exports.Movie = Movie;
exports.validateMovie = validateMovie;
