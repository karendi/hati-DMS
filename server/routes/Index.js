const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const documentRouter = require('./DocumentRoutes');
const roleRouter = require('./RoleRoutes');
const userRouter = require('./UserRoutes');
const searchRouter = require('./SearchRoutes');

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to Hati!' });
});

app.use('/api/users', userRouter);
app.use('/api/documents', documentRouter);
app.use('/api/roles', roleRouter);
app.use('/api/search', searchRouter);

module.exports = app;
