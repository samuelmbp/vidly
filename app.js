const express = require('express');
const app = express();
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
	'Action',
	'Thriller',
	'Romance',
	'Drama',
	'Science Fiction',
	'Test',
];

// Get request for all the genres
app.get('/api/genres', (req, res) => {
	res.send(genres);
});

// Dynamic PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
