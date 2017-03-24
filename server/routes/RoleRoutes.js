const express = require('express');
const RoleController = require('../controllers/RoleController');
const Authentication = require('../middleware/Authentication');

const roleRouter = express.Router();

roleRouter.route('/')
  .post(Authentication.verifyUser, Authentication.verifyAdmin, RoleController.createRole)
  .get(Authentication.verifyUser, Authentication.verifyAdmin, RoleController.listAllRoles);

roleRouter.route('/:id')
  .put(Authentication.verifyUser, Authentication.verifyAdmin, RoleController.updateRole)
  .delete(Authentication.verifyUser, Authentication.verifyAdmin, RoleController.deleteRole)
  .get(Authentication.verifyUser, Authentication.verifyAdmin, RoleController.getSpecificRole);

module.exports = roleRouter;
