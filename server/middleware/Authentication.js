require('dotenv').config({ silent: true });
const jwt = require('jsonwebtoken');
const db = require('../models/Index.js');

const secret = process.env.SECRET;

/**
 * Authentication
 *
 * Creates the Authentication class
 * @class
 */
class Authentication {
  /**
   * verifyUser
   *
   * Verifies a user
   * @param {object} req The request object
   * @param {object} res The response object
   * @param {Next} next The next function
   * @returns {void}
   */
  static verifyUser(req, res, next) {
    const token = req.body.token || req.query.token || req.headers.authorization || req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({ message: 'Verification failed' });
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).send({ message: 'Invalid token' });
      } else {
        req.decodedToken = decoded;
        next();
      }
    });
  }

  /**
   * verifyAdmin
   *
   * Verifies the admin
   * @param {object} req The request object
   * @param {object} res The response object
   * @param {Next} next The next function
   * @returns {void}
   */
  static verifyAdmin(req, res, next) {
    db.Role
      .findById(req.decodedToken.roleId)
      .then((role) => {
        if (role.title === 'admin' || role.id === 1) {
          next();
        } else {
          return res.status(403).send({ message: 'Permission denied, admin only' });
        }
      });
  }

  /**
   * logout
   *
   * Ensures only a verified user can log out
   * @param {object} req The request object
   * @param {object} res The response object
   * @param {Next} next The next function
   * @returns {void}
   */
  static logout(req, res, next) {
    const token = req.headers.token || req.headers.authorization || req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({ message: 'You must be logged in' });
    }
    const decoded = req.decodedToken;
    if (token && decoded) {
      delete req.headers.token;
      delete req.headers.authorization;
      delete req.headers['x-access-token'];
      delete req.decodedToken;
      next();
    }
  }
}

module.exports = Authentication;
