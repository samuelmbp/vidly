const express = require('express');
const app = express();

const genres = require('./routes/genres');

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
