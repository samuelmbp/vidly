const { Movie, validateMovie } = require('../models/movies');
const { Genre } = require('../models/genres');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	const movie = await Movie.find().sort('name');
	res.send(movie);
});

router.get('/:id', async (req, res) => {
	const movie = await Movie.findById(req.params.id);
	if(!movie) return res.status(400).send('The movie with the given ID was not found.');
	res.send(movie);
});

router.post('/', async (req, res) => {
	const validate = validateMovie(req.body);
	if (validate) return res.status(400).send(validate.error.details[0].message);

	const genre = await Genre.findById(req.body.genreId);
	if (!genre) return res.status(400).send('Invalid genre.');

	let movie = new Movie({
		title: req.body.title,
		// Embed the genre document
		genre: {
			_id: genre._id,
			name: genre.name,
		},
		numberInStock: req.body.numberInStock,
		dailyRentalRate: req.body.dailyRentalRate,
	});

	movie = await movie.save();
	res.send(movie);
});

router.put('/:id', async (req, res) => {
	const validate = validateMovie(req.body);
	if (validate) return res.status(400).send(validate.error.details[0].message);

	const genre = await Genre.findById(req.body.genreId);
	if (!genre) return res.status(400).send('Invalid genre.');

	const movie = await Movie.findByIdAndUpdate(req.params.id, 
		{
			title: req.body.title,
			genre: {
				_id: genre._id,
				name: genre.name,
			},
			numberInStock: req.body.numberInStock,
			dailyRentalRate: req.body.dailyRentalRate,
	}, 	{ new: true });

	if(!movie) return res.status(400).send('The movie with the given ID was not found.');

	movie.send();
});

router.delete('/:id', async (req, res) => {
	const movie = await Movie.findByIdAndDelete(req.params.id);
	if(!movie) return res.status(400).send('The movie with the given ID was not found.');
	res.send(movie);
});

module.exports = router;
