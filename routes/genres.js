const { Genre, validateGenre } = require('../models/genre');
const express = require('express');
const router = express.Router();

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

	const genre = new Genre({ name: req.body.name });
	await genre.save();
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

module.exports = router;
