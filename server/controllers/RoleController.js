import db from '../models';

class RoleController {
  static createRole(req, res) {
    let roleInfo = {};
    if (req.body.id) {
      roleInfo = { title: req.body.title, id: req.body.id };
    } else { roleInfo = { title: req.body.title }; }
    db.Role
      .create(roleInfo)
      .then((role) => {
        res.status(200).send({ message: 'The role was created successfully', role });
      })
      .catch((err) => {
        res.status(400).send({ message: 'error', err })
      });
  }

  static updateRole(req, res) {
    db.Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).send({ message: 'Role was not found'});
        }
        role.update({
          title: req.body.title || role.title
        })
        .then((updatedRole) => {
          res.status(200).send({ message: updatedRole });
        });
      });
  }

  static deleteRole(req, res) {
    db.Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).send({ message: 'Role was not found' });
        }
        role.destroy()
        .then(() => {
          res.status(200).send({ message: 'Role was successfully deleted' });
        });
      });
  }

  static listAllRoles(req, res) {
    db.Role
      .findAll()
      .then((allRoles) => {
        if (!allRoles) {
          return res.status(404).send({ message: 'A problem was encountered while getting roles' })
        }
        res.status(200).send({ message: allRoles });
      });
  }

  static getSpecificRole(req, res) {
    db.Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).send({ message: 'Role was not found' });
        }
        res.status(200).send({ message: role });
      })
  }
}

export default RoleController;
