const { Rental, validateRentals } = require('../models/rental');
const { Customer } = require('../models/customer');
const auth = require('../middleware/auth');
const { Movie } = require('../models/movie');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	const rental = await Rental.find().sort('-dateOut');
	res.send(rental);
});

router.post('/', auth, async (req, res) => {
	const validate = validateRentals(req.body);
	if (validate) return res.status(400).send(validate.error.details[0].message);

	const customer = await Customer.findById(req.body.customerId);
	if (!customer) return res.status(400).send('Invalid customer');

	const movie = await Movie.findById(req.body.movieId);
	if (!movie) return res.status(400).send('Invalid movie.');

	if (movie.numberInStock === 0)
		return res.status(400), send('Movie not in stock.');

	const rental = new Rental({
		customer: {
			_id: customer._id,
			name: customer.name,
			phone: customer.phone,
		},
		movie: {
			_id: movie._id,
			title: movie.title,
			dailyRentalRate: movie.dailyRentalRate,
		},
	});

	await rental.save();

	movie.numberInStock--;
	movie.save();

	res.send(rental);
});

module.exports = router;
