const Joi = require('joi');
const mongoose = require('mongoose');

/** Schema */
const genresSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 4,
		maxLength: 55,
	},
});

/** Model */
const Genre = mongoose.model('Genre', genresSchema);

/** Genre validation - user input */
function validateGenre(genre) {
	const schema = {
		name: Joi.string().min(3).required(),
	};
	return Joi.validate(genre, schema, (err, value) => {});
}

module.exports.Genre = Genre;
module.exports.validateGenre = validateGenre;
