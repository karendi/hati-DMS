import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import documentRouter from './DocumentRoutes';
import roleRouter from './RoleRoutes';
import userRouter from './UserRoutes';
import searchRouter from './SearchRoutes';

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to Hati!' });
});

app.use('/users', userRouter);
app.use('/documents', documentRouter);
app.use('/roles', roleRouter);
app.use('/search', searchRouter);

export default app;
