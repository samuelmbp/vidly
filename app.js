const Joi = require('joi');
const express = require('express');
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
	{ id: 1, name: 'Action' },
	{ id: 2, name: 'Thriller' },
	{ id: 3, name: 'Romance' },
	{ id: 4, name: 'Drama' },
	{ id: 5, name: 'Science Fiction' },
];

// Get -> retrieve all the genres
app.get('/api/genres', (req, res) => {
	res.send(genres);
});

// Get -> retrieve single genre
app.get('/api/genres/:id', (req, res) => {
	const genre = genres.find((genre) => genre.id === parseInt(req.params.id));

	if (!genre)
		return res.status(404).send('The genre with the given ID was not found.');

	res.send(genre);
});

// Post -> create a new genre
app.post('/api/genres', (req, res) => {
	// Validation
	const result = validateGenre(req.body);
	if (result) return res.status(400).send(result.error.details[0].message);

	const genre = {
		id: genres.length + 1,
		name: req.body.name,
	};

	genres.push(genre);

	// Send the genre in the body of the response
	res.send(genre);
});

// Put -> Update a genre
app.put('/api/genres/:id', (req, res) => {
	const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
	if (!genre)
		return res.status(404).send('The genre with the given ID was not found.');

	// Error when the updated data does not match the validation
	const result = validateGenre(genre);
	if (result) return res.status(400).send(result.error);

	genre.name = req.body.name;
	res.send(genre);
});

// Delete Method
app.delete('/api/genres/:id', (req, res) => {
	// Find the genre by id
	const genre = genres.find((genre) => genre.id === parseInt(req.params.id));

	if (!genre)
		return res.status(404).send('The genre with the given ID does not exists.');

	// If exists -> delete
	const index = genres.indexOf(genre);
	genres.splice(index, 1);

	// Send to the genre in the response body
	res.send(genre);
});

// Genre validation
function validateGenre(genre) {
	const schema = {
		name: Joi.string().min(3).required(),
	};

	return Joi.validate(genre, schema, (err, value) => {});
}

// Dynamic PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
