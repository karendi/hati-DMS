import express from 'express';
import UserController from '../controllers/UserController';
import Authentication from '../middleware/Authentication';

const userRouter = express.Router();

userRouter.route('/')
  .get(Authentication.verifyUser, Authentication.verifyAdmin, UserController.listAllUsers)
  .post(UserController.createNewUser);

userRouter.route('/login')
  .post(UserController.loginUser);

userRouter.route('/logout')
  .post(Authentication.verifyUser, Authentication.logout, UserController.logoutUser);

userRouter.route('/:id')
  .get(Authentication.verifyUser, UserController.findUserById)
  .put(Authentication.verifyUser, UserController.updateUser)
  .delete(Authentication.verifyUser, Authentication.verifyAdmin, UserController.deleteUser);

userRouter.route('/:id/documents')
  .get(Authentication.verifyUser, UserController.listUserDocuments);

export default userRouter;
