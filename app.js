const mongoose = require('mongoose/');
const express = require('express');
const app = express();

const genres = require('./routes/genres');

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

// Dynamic PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
