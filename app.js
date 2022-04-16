const Joi = require('joi');
const express = require('express');
const { join } = require('path');
const app = express();

// Middleware for json data
app.use(express.json());
/**
 * http://vidly.com/api/generes
 *
 * http://localhost:3000/api/genres
 *
 * TODO:
 * Requests:
 *  - get the genres
 *  - post (create a new one)
 *  - update
 *  - delete
 */

const genres = [
	{ id: 1, genre: 'Action' },
	{ id: 2, genre: 'Thriller' },
	{ id: 3, genre: 'Romance' },
	{ id: 4, genre: 'Drama' },
	{ id: 5, genre: 'Science Fiction' },
];

// Get request for all the genres
app.get('/api/genres', (req, res) => {
	res.send(genres);
});

app.post('/api/genres', (req, res) => {
	const genre = {
		id: genres.length + 1,
		genre: req.body.genre,
	};

	genres.push(genre);

	// Send the genre in the body of the response
	res.send(genre);
});

// Dynamic PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
