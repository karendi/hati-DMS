import express from 'express';
import RoleController from './controllers/RoleController';
import Authentication from './middleware/Auth';

const roleRouter = express.Router();

roleRouter.route('/')
  .post(Authentication.verifyUser, Authentication.verifyAdmin, RoleController.createRole)
  .get(Authentication.verifyUser, Authentication.verifyAdmin, RoleController.listAllRoles);

roleRouter.route('/:id')
  .put(Authentication.verifyUser, Authentication.verifyAdmin, RoleController.updateRole)
  .delete(Authentication.verifyUser, Authentication.verifyAdmin, RoleController.deleteRole)
  .get(Authentication.verifyUser, Authentication.verifyAdmin, RoleController.getSpecificRole);

export default roleRouter;
