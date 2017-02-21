import jwt from 'jsonwebtoken';
import db from '../models';

const secret = process.env.SECRET || 'wearethepirateswhodontdoanything';
const defaultRoleId = 2;

const userPersonalDetails = (user) => {
  const userDetails = {
    fName: user.fName,
    lName: user.lName,
    email: user.email,
    username: user.username,
    password: user.password,
    roleId: user.roleId,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
  return userDetails;
};

class UserController {
  static createNewUser(req, res) {
    db.Users
      .create({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        roleId: req.body.roleId
      })
      .then((user) => {
        const payload = {
          userId: user.id,
          roleId: user.roleId || defaultRoleId
        };
        const token = jwt.sign(payload, secret, { expiresIn: '2 days' });
        user = userPersonalDetails()user;
        return res.status(201).send({
          message: 'User was successfully created',
          token,
          user
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message
        })
      });
  },

  static loginUser(req, res) {
    db.Users
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
          const token = jwt.sign(payload, secret, { expiresIn: '2 days' });
          user = userPersonalDetails()user;
          return res.status(200).send({
            message: 'You were successfully logged in',
            token,
            user
          });
        }
      })
      .catch((err) => {
        res.status(401).send({
          message: `There was a problem while logging in ${err.message}`,
        });
      });
  },

  static findUserById(req, res) {
    db.Users
      .findById(req.params.id)
      .then((user) => {
        if (user) {
          user = userPersonalDetails(user);
          return res.status(200).send({ message: user });
        }
      })
      .catch((err) => {
        res.status(404).send({
          message: `User ${req.params.id} was not found`
        });
      });
  },

  static listAllUsers(req, res) {
    db.Users
      .findAll({
        userDetails: [
          'fName',
          'lName',
          'email',
          'username',
          'roleId',
          'createdAt',
          'updatedAt'
        ]
      })
      .then((allUsers) {
        res.status(200).send({ message: allUsers });
      })
      .catch((err) => {
        res.status(404).send({
          message: 'There was a problem getting all users'
        });
      });
  },

  static updateUser(req, res) {
    db.Users
      .findById(req.params.id)
      .then((result) => {
        if (result) {
          if (String(req.decodedToken.userId) !== String(req.params.id)) {
            return res.send({ message: 'Request not allowed' });
          }
          result.update({
            fName: req.body.fName || result.fName,
            lName: req.body.lName || result.lName,
            lastname: req.body.lastname || result.lastname,
            email: req.body.email || result.email,
            username: req.body.username || result.username,
            password: req.body.password || result.password
          })
          .then((updatedProfile) => {
            updatedProfile = userPersonalDetails(updatedProfile);
            res.status(200).send({ message: updatedProfile });
          });
        } else {
          res.status(404).send({
            message: 'User was not found'
          });
        }
      });
  },

  static deleteUser(req, res) {
    db.Users
      .findById(req.params.id)
      .then((user) => {
        if (user) {
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
  },

  static listUserDocuments(req, res) {
    db.Users
      .findAll({ where: { id: req.params.id }, include: [{ model: db.Document }] })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User was not found' });
        }
        res.status(200).send({ message: user });
      });
  },

  static logoutUser(req, res) {
    res.status(200).send({
      message: 'You were logged out successfully'
    });
  }
}

export default UserController;
