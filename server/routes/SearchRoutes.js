const express = require('express');
const DocumentController = require('../controllers/DocumentController');
const UserController = require('../controllers/UserController');
const Authentication = require('../middleware/Authentication');

const searchRouter = express.Router();

searchRouter.route('/users')
  .get(Authentication.verifyUser, UserController.searchUser);

searchRouter.route('/documents')
  .get(Authentication.verifyUser, DocumentController.searchDocument);

module.exports = searchRouter;
