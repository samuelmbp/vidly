const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

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

router.get('/', async (req, res) => {
	const genres = await Genre.find().sort('name');
	res.send(genres);
});

router.get('/:id', async (req, res) => {
	const genre = await Genre.findById(req.params.id);
	if (!genre)
		return res.status(404).send('The genre with the given ID was not found.');
	res.send(genre);
});

router.post('/', async (req, res) => {
	const result = validateGenre(req.body.name);
	if (result) return res.status(400).send(result.error);

	let genre = new Genre({ name: req.body.name });
	genre = await genre.save();
	res.send(genre);
});

router.put('/:id', async (req, res) => {
	const result = validateGenre(req.body);
	if (result) return res.status(400).send(result.error);

	const genre = await Genre.findByIdAndUpdate(
		req.params.id,
		{ name: req.body.name },
		{ new: true }
	);

	if (!genre)
		// Checking for null values
		return res.status(404).send('The genre with the given ID was not found.');

	res.send(genre);
});

router.delete('/:id', async (req, res) => {
	const genre = await Genre.findByIdAndDelete(req.params.id);
	if (!genre)
		return res.status(404).send('The genre with the given ID does not exists.');

	res.send(genre);
});

/** Genre validation - user input */
function validateGenre(genre) {
	const schema = {
		name: Joi.string().min(3).required(),
	};
	return Joi.validate(genre, schema, (err, value) => {});
}

module.exports = router;
