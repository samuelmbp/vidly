const mongoose = require('mongoose/');
const express = require('express');
const app = express();

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');

/** Connection MongoDB */
mongoose
	.connect('mongodb://localhost/vidly')
	.then(() => console.log('Connected to MongoDB...'))
	.catch((err) => console.log('Cannot connect to MongoDB...', err.message));

/**
 * http://vidly.com/api/generes
 *
 * http://localhost:3000/api/genres
 */

// Middleware for json data
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);

// Dynamic PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
