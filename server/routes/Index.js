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

app.use('/api/users', userRouter);
app.use('/api/documents', documentRouter);
app.use('/api/roles', roleRouter);
app.use('/api/search', searchRouter);


app.get('/api/documentation', (req, res) => {
  res.sendFile(path.join(__dirname, './hati.html'));
});

module.exports = app;
