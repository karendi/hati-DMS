const jwt = require('jsonwebtoken');
const db = require('../models/Index.js');

const secret = process.env.SECRET;

/**
 * User Controller
 *
 * Creates the UserController
 * @class
 */
class UserController {
  /**
   * createNewUser
   *
   * Creates a new user
   * @param {object} req The request object
   * @param {object} res The response object
   * @returns {void}
   */
  static createNewUser(req, res) {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    if (!fName || !lName || !email || !username || !password) {
      return res.status(400).send({
        message: 'Fill the required fields',
      });
    }
    db.User
      .findOne({
        where: {
          $or: {
            email, username
          }
        }
      })
      .then((result) => {
        if (result) {
          return res.status(409).send({
            success: false,
            message: 'Email or username already exists'
          });
        }
        db.User
          .create(req.body)
          .then((user) => {
            const payload = {
              userId: user.id,
              roleId: user.roleId
            };
            const token = jwt.sign(payload, secret, { expiresIn: '24h' });
            user.password = null;
            res.status(201).send({
              message: 'User was successfully created',
              token,
              data: user
            });
          })
          .catch((err) => {
            res.status(400).send({
              error: 'There was a problem creating the user',
              err
            });
          });
      });
  }

  /**
   * loginUser
   *
   * Logs in a user
   * @param {object} req The request object
   * @param {object} res The response object
   * @returns {void}
   */
  static loginUser(req, res) {
    db.User
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(403).send({
            message: 'No user was found',
          });
        }
        if (user && user.validatePassword(req.body.password)) {
          const payload = {
            userId: user.id,
            roleId: user.roleId
          };
          const token = jwt.sign(payload, secret, { expiresIn: '24h' });
          res.status(200).send({
            message: 'You were successfully logged in',
            token,
            expiresIn: '24h'
          });
        } else {
          res.status(401).send({
            message: 'Invalid login credentials',
          });
        }
      })
      .catch((err) => {
        res.status(401).send({
          error: 'Invalid login credentials',
          err
        });
      });
  }

  /**
   * findUserById
   *
   * Finds a specific user
   * @param {object} req The request object
   * @param {object} res The response object
   * @returns {void}
   */
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
        if (!user) {
          return res.status(404).send({
            message: 'The user was not found'
          });
        }
        if (user) {
          user.password = null;
          return res.status(200).send({ message: 'User found!', data: user });
        }
      })
      .catch((err) => {
        res.status(404).send({
          error: `User ${req.params.id} was not found`,
          err
        });
      });
  }

  /**
   * listAllUsers
   *
   * Lists all users
   * @param {object} req The request object
   * @param {object} res The response object
   * @returns {void}
   */
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
    query.attributes = userDetails.user;
    query.limit = req.query.limit || null;
    query.offset = req.query.offset || null;
    query.order = [['createdAt', 'DESC']];
    db.User
      .findAll({ query: query, limit: query.limit, offset: query.offset })
      .then((allUsers) => {
        if (allUsers) {
          res.status(200).send({
            message: 'Listing available users',
            data: allUsers
          });
        }
      })
      .catch((err) => {
        res.status(404).send({
          error: 'There was a problem getting all users',
          err
        });
      });
  }

  /**
   * updateUser
   *
   * Updates an existing user
   * @param {object} req The request object
   * @param {object} res The response object
   * @returns {void}
   */
  static updateUser(req, res) {
    db.User
      .findById(req.params.id)
      .then((user) => {
        if (user) {
          if (String(req.decodedToken.userId) !== String(req.params.id)) {
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
            updatedProfile.password = null;
            res.status(200).send({
              message: 'User updated successfully',
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

  /**
   * deleteUser
   *
   * Deletes a specific user
   * @param {object} req The request object
   * @param {object} res The response object
   * @returns {void}
   */
  static deleteUser(req, res) {
    db.User
      .findById(req.params.id)
      .then((user) => {
        if (user) {
          // TODO: Allow user to delete themselves
          user.destroy()
          .then(() => {
            res.status(200).send({
              message: 'User was deleted successfully'
            });
          });
        } else {
          res.status(403).send({
            message: 'User was not found'
          });
        }
      });
  }

  /**
   * listUserDocuments
   *
   * Lists a specific user's documents
   * @param {object} req The request object
   * @param {object} res The response object
   * @returns {void}
   */
  static listUserDocuments(req, res) {
    const userDetails = {
      user: ['id', 'fName', 'lName', 'email', 'username'],
      doc: ['id', 'title', 'content', 'userId']
    };
    db.User
      .findAll({
        where: { id: req.params.id },
        include: [{
          model: db.Document, attributes: userDetails.doc
        }]
      })
      .then((user) => {
        if (!user) {
          res.status(404).send({ message: 'User was not found' });
        } else {
          res.status(200).send({ message: 'Documents Found', data: user[0].Documents });
        }
      });
  }

  /**
   * searchUser
   *
   * Searches users
   * @param {object} req The request object
   * @param {object} res The response object
   * @returns {void}
   */
  static searchUser(req, res) {
    db.User
      .findAll({
        where: {
          username: { $iLike: `%${req.query.q}%` }
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'The user was not found'
          });
        }
        if (user) {
          return res.status(200).send({
            message: 'User found!',
            data: [user[0].fName, user[0].lName, user[0].username]
          });
        }
      })
      .catch((err) => {
        res.status(404).send({
          error: 'There was a problem getting user',
          err
        });
      });
  }

  /**
   * logoutUser
   *
   * Logs out a user
   * @param {object} req The request object
   * @param {object} res The response object
   * @returns {void}
   */
  static logoutUser(req, res) {
    res.status(200).send({
      message: 'You were logged out successfully'
    });
  }
}

module.exports = UserController;
