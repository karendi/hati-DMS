const express = require('express');
const UserController = require('../controllers/UserController');
const Authentication = require('../middleware/Authentication');

const userRouter = express.Router();

userRouter.route('/')
  .get(Authentication.verifyUser, Authentication.verifyAdmin, UserController.listAllUsers)
  .post(UserController.createNewUser);

userRouter.route('/login')
  .post(UserController.loginUser);

userRouter.route('/logout')
  .post(Authentication.verifyUser, UserController.logoutUser);

userRouter.route('/:id')
  .get(Authentication.verifyUser, UserController.findUserById)
  .put(Authentication.verifyUser, UserController.updateUser)
  .delete(Authentication.verifyUser, Authentication.verifyAdmin, UserController.deleteUser);

userRouter.route('/:id/documents')
  .get(Authentication.verifyUser, UserController.listUserDocuments);

module.exports = userRouter;
