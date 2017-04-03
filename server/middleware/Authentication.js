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
      return res.status(401).send({ message: 'No token provided' });
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
          return res.status(403).send({ message: 'Permission denied, admin access only' });
        }
      });
  }
}

module.exports = Authentication;
