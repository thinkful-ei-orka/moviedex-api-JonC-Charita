const express = require('express');
const morgan = require('morgan');
const app = express();
const movieList = require('./movies-data.json');
require('dotenv').config();

app.use(morgan('dev'));

app.use(function validateBearerToken(req, res, next) {
  const givenToken = req.get('Authorization');
  const apiToken = process.env.API_TOKEN;
  console.log(`validate bearer token`);
  if (!givenToken || givenToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' });
  }
});

const PORT = 3000;

// console.log(process.env.API_TOKEN);

/* END SERVER DATA */
/* =============== */

function handleGetTypes(req, res) {
  res.json(movieList);
}

app.get('/types', handleGetTypes);

/* App Listen */
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}...`);
});
