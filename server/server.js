const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 8080;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('You are here!');
});

app.listen(port, (error) => {
	if (!error) {
		console.log(`Listening on port ${port}...`);
	} else {
		console.log('error');
	}
});

exports = module.exports = app;
