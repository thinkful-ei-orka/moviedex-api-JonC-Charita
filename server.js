const express = require('express');
const morgan = require('morgan');
const app = express();
const movieList = require('./movies-data.json');
const helmet = require('helmet');

const cors = require('cors');
require('dotenv').config();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use(function validateBearerToken(req, res, next) {
  const givenToken = req.get('Authorization');
  const apiToken = process.env.API_TOKEN;
  console.log(`validate bearer token ${givenToken} ${apiToken}`);
  if (!givenToken || givenToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' });
  }
  next();
});

const PORT = 3000;

// console.log(process.env.API_TOKEN);

/* END SERVER DATA */
/* =============== */

app.get('/movie', function handleGetMovies(req, res) {
  let response = movieList;
  let { genre, country, avg_vote } = req.query;

  if (genre) {
    response = response.filter((movie) =>
      movie.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }
  if (country) {
    response = response.filter((movie) =>
      movie.country.toLowerCase().includes(country.toLowerCase())
    );
  }
  if (avg_vote) {
    response = response.filter((movie) => movie.avg_vote >= avg_vote);
  }
  res.json(response);
});

// function handleGetTypes(req, res) {
//   res.json(movieList);
// }

// app.get('/types', handleGetTypes);

/* App Listen */
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}...`);
});
