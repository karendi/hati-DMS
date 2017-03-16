import db from '../models/Index.js';

class RoleController {
  static createRole(req, res) {
    let roleInfo = {};
    if (req.body.id) {
      roleInfo = { title: req.body.title, id: req.body.id };
    } else { roleInfo = { title: req.body.title }; }
    if (!req.body.title)
      return res.status(400).send({ message: 'Title cannot be blank' });
    const title = req.body.title;
    db.Role
      .findOne({
        where: { title }
      })
      .then((result) => {
        if (result) {
          return res.status(409).send({
            success: false,
            message: 'Role already exists'
          });
        }
      return db.Role
        .create(roleInfo)
        .then((role) => {
          res.status(200).send({ message: 'The role was created successfully', role });
        })
        .catch((err) => {
          res.status(400).send({ message: 'There was a problem creating the role', err })
        });
    });
  }

  static updateRole(req, res) {
    db.Role
      .findById(req.params.id)
      .then((role) => {
        if (!role)
          return res.status(404).send({ message: 'Role was not found' });
        const title = req.body.title;
        if (!title)
          return res.status(404).send({ message: 'Title cannot be empty' });
        role.update({
          title: req.body.title || role.title
        })
        .then((updatedRole) => {
          res.status(200).send({
            message: 'Role was updated successfully',
            data: updatedRole });
        });
      });
  }

  static deleteRole(req, res) {
    db.Role
      .findById(req.params.id)
      .then((role) => {
        if (!role)
          return res.status(400).send({ message: 'Role was not found' });
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
        if (!allRoles)
          return res.status(404).send({ message: 'A problem was encountered while getting roles' });
        res.status(200).send({ message: 'Listing available roles', data: allRoles });
      });
  }

  static getSpecificRole(req, res) {
    db.Role
      .findById(req.params.id)
      .then((role) => {
        if (!role)
          return res.status(404).send({ message: 'Role was not found' });
        res.status(200).send({ message: 'Role found!', data: role });
      });
  }
}

export default RoleController;