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
              roleId: user.roleId,
              userName: user.username
            };
            const token = jwt.sign(payload, secret, { expiresIn: '24h' });
            user.password = null;
            res.status(201).send({
              message: 'User was successfully created',
              token,
              data: user
            });
          })
          .catch(() => {
            res.status(400).send({
              error: 'There was a problem creating the user'
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
            roleId: user.roleId,
            userName: user.username
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
      .catch(() => {
        res.status(401).send({
          error: 'Invalid login credentials'
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
      user: ['fName', 'lName', 'username'],
      role: ['title']
    };
    const query = req.decodedToken.roleId === 1 ? {
      where: {
        id: req.params.id
      },
      include: [
        {
          model: db.Role
        }
      ]
    } : {
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
          return res.status(200).send({ message: 'User found!', data: user });
        }
      })
      .catch(() => {
        res.status(404).send({
          error: `User ${req.params.id} was not found`
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
      user: ['fName', 'lName', 'username']
    };
    const query = req.decodedToken.roleId === 1 ? {
      include: [
        {
          model: db.Role
        }
      ]
    } : {
      include: [
        {
          model: db.Role,
          attributes: ['title']
        }
      ]
    };
    query.limit = req.query.limit || null;
    query.offset = req.query.offset || null;
    query.order = [['username', 'ASC']];
    db.User
      .findAll({
        query,
        attributes: userDetails.user,
        order: query.order,
        limit: query.limit,
        offset: query.offset
      })
      .then((allUsers) => {
        if (allUsers) {
          res.status(200).send({
            message: 'Listing available users',
            data: allUsers
          });
        }
      })
      .catch(() => {
        res.status(404).send({
          error: 'There was a problem getting all users'
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
            return res.status(403).send({ message: 'Updating a different user\'s account is not allowed' });
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
      doc: ['title', 'content', 'docOwner']
    };

    return db.User
      .findById(req.params.id, {
        include: [{
          model: db.Document,
          as: 'documents',
          where: { access: 'public' },
          attributes: userDetails.doc
        }],
      })
      .then((user) => {
        if (!user) {
          res.status(404).send({ message: 'User was not found' });
        } else {
          res.status(200).send(user.documents);
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
    const searchTerm = req.query.q;
    if (!Object.keys(req.query).length || !searchTerm) {
      return res.status(400).send({ message: 'Input a valid search term' });
    }
    const query = req.decodedToken.roleId === 1 ? {
      where: {
        $or: {
          username: { $iLike: `%${searchTerm}%` },
          fName: { $iLike: `%${searchTerm}%` },
          lName: { $iLike: `%${searchTerm}%` },
        }
      }
    } : {
      attributes: ['fName', 'lName', 'username'],
      where: {
        $or: {
          username: { $iLike: `%${searchTerm}%` },
          fName: { $iLike: `%${searchTerm}%` },
          lName: { $iLike: `%${searchTerm}%` },
        }
      }
    };
    db.User
      .findAll(query)
      .then((result) => {
        if (result.length === 0) {
          return res.status(404).send({
            message: 'No results were found'
          });
        }
        return res.status(200).send({
          message: 'Search Results!',
          data: { result }
        });
      })
      .catch(() => {
        res.status(404).send({
          error: 'There user was not found'
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
