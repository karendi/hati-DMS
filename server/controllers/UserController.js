import jwt from 'jsonwebtoken';
import db from '../models';

const secret = process.env.SECRET || 'wearethepirateswhodontdoanything';

class UserController {
  static createNewUser(req, res) {
    db.User
      .create(req.body)
      .then((user) => {
        const payload = {
          userId: user.id,
          roleId: user.roleId
        };
        const token = jwt.sign(payload, secret, { expiresIn: '24h' });
        return res.status(201).send({
          message: 'User was successfully created',
          token,
          data: user
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message
        })
      });
  }

  static loginUser(req, res) {
    db.User
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then((user) => {
        if (user && user.validatePassword(req.body.password)) {
          const payload = {
            userId: user.id,
            roleId: user.roleId
          };
          const token = jwt.sign(payload, secret, { expiresIn: '24h' });
          return res.status(200).send({
            message: 'You were successfully logged in',
            token,
            expiresIn: '24h'
          });
        }
      })
      .catch((err) => {
        res.status(401).send({
          message: `There was a problem while logging in ${err.message}`,
        });
      });
  }

  static findUserById(req, res) {
    const userDetails = {
      user: ['id', 'fName', 'lName', 'email', 'username'],
      role: ['id', 'title']
    };
    const query = {
      where: {
        id: req.params.id
      },
      attributes: userDetails.user,
      include: [
        {
          model: db.Role,
          attributes: userDetails.role
        }
      ]
    };
    db.User
      .findOne(query)
      .then((user) => {
        if (user) {
          return res.status(200).send({ message: 'User found!', data: user });
        }
      })
      .catch((err) => {
        res.status(404).send({
          message: `User ${req.params.id} was not found`
        });
      });
  }

  static listAllUsers(req, res) {
    const userDetails = {
      user: ['id', 'fName', 'lName', 'email', 'username'],
      role: ['id', 'title']
    };
    const query = {
      attributes: userDetails.user,
      include: [
        {
          model: db.Role,
          attributes: userDetails.role
        }
      ]
    };
    db.User
      .findAll(query)
      .then((allUsers) => {
        if (allUsers) {
          res.status(200).send({
            message: "Listing available users",
            data: allUsers
          });
        }
      })
      .catch((err) => {
        res.status(404).send({
          message: 'There was a problem getting all users'
        });
      })
  }

  static updateUser(req, res) {
    db.User
      .findById(req.params.id)
      .then((user) => {
        if (user) {
          if (toString(req.decodedToken.userId) !== toString(req.params.id)) {
            return res.send({ message: 'Request not allowed' });
          }
          user.update({
            fName: req.body.fName || user.fName,
            lName: req.body.lName || user.lName,
            email: req.body.email || user.email,
            username: req.body.username || user.username,
            password: req.body.password || user.password
          })
          .then((updatedProfile) => {
            res.status(200).send({
              message: 'Information updated successfully',
              data: updatedProfile
            });
          });
        } else {
          res.status(404).send({
            message: 'User was not found'
          });
        }
      });
  }

  static deleteUser(req, res) {
    db.User
      .findById(req.params.id)
      .then((user) => {
        if (user) {
          if (toString(req.decodedToken.userId) !== toString(req.params.id)) {
            return res.send({ message: 'Request not allowed' });
          }
          user.destroy()
          .then(() => {
            res.status(200).send({
              message: 'User was deleted successfully'
            });
          });
        } else {
          res.status(404).send({
            message: 'User was not found'
          });
        }
      });
  }

  static listUserDocuments(req, res) {
    db.User
      .findAll({ where: { id: req.params.id }, include: [{ model: db.Document }] })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User was not found' });
        }
        res.status(200).send({ message: user });
      });
  }

  static logoutUser(req, res) {
    res.status(200).send({
      message: 'You were logged out successfully'
    });
  }
}

export default UserController;
