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

app.use('/api/users', userRouter);
app.use('/api/documents', documentRouter);
app.use('/api/roles', roleRouter);
app.use('/api/search', searchRouter);

export default app;
