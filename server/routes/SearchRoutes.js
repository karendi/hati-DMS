import express from 'express';
import DocumentController from '../controllers/DocumentController';
import UserController from '../controllers/UserController';
import Authentication from '../middleware/Authentication';

const searchRouter = express.Router();

searchRouter.route('/users')
  .get(Authentication.verifyUser, UserController.searchUser);

searchRouter.route('/documents')
  .get(Authentication.verifyUser, DocumentController.searchDocument);

export default searchRouter;
