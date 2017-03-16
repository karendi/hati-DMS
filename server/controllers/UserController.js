import jwt from 'jsonwebtoken';
import db from '../models/Index.js';

const secret = process.env.SECRET;

class UserController {
  static createNewUser(req, res) {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    if (!fName || !lName || !email || !username || !password)
      return res.status(400).send({
        message: 'Fill the required fields',
      });
    db.User
      .findOne({
        where: {
          $or: {
            email, username
          }
        }
      })
      .then((result) => {
        if (result)
          return res.status(409).send({
            success: false,
            message: 'Email or username already exists'
          });
      return db.User
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
            message: 'There was a problem creating the user',
            err
          });
        });
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
        if (!user)
          return res.status(403).send({
            message: 'No user was found',
          });
        if (!user.validatePassword(req.body.password))
          return res.status(401).send({
            message: 'Invalid password',
          });
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
          message: 'Invalid login credentials',
          err
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
        if (!user)
          return res.status(404).send({
            message: 'The user was not found'
          });
        if (user)
          return res.status(200).send({ message: 'User found!', data: user });
      })
      .catch((err) => {
        res.status(404).send({
          message: `User ${req.params.id} was not found`,
          err
        });
      });
  }

  static listAllUsers(req, res) {
    const userDetails = {
      user: ['id', 'fName', 'lName', 'email', 'username'],
      role: ['id', 'title']
    };
    let query;
    query = {
      attributes: userDetails.user,
      include: [
        {
          model: db.Role,
          attributes: userDetails.role
        }
      ]
    };
    query = { attributes: userDetails.user };
    query.limit = req.query.limit || null;
    query.offset = req.query.offset || null;
    query.order = [['createdAt', 'DESC']];
    db.User
      .findAll({ query, limit: query.limit, offset: query.offset })
      .then((allUsers) => {
        if (allUsers)
          res.status(200).send({
            message: 'Listing available users',
            data: allUsers
          });
      })
      .catch((err) => {
        res.status(404).send({
          message: 'There was a problem getting all users',
          err
        });
      });
  }

  static updateUser(req, res) {
    db.User
      .findById(req.params.id)
      .then((user) => {
        if (user) {
          if (toString(req.decodedToken.userId) !== toString(req.params.id))
            return res.send({ message: 'Request not allowed' });
          user.update({
            fName: req.body.fName || user.fName,
            lName: req.body.lName || user.lName,
            email: req.body.email || user.email,
            username: req.body.username || user.username,
            password: req.body.password || user.password
          })
          .then((updatedProfile) => {
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

  static deleteUser(req, res) {
    db.User
      .findById(req.params.id)
      .then((user) => {
        if (user) {
          if (toString(req.decodedToken.userId) !== toString(req.params.id))
            return res.send({ message: 'Request not allowed' });
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
    const userDetails = {
      user: ['id', 'fName', 'lName', 'email', 'username'],
      doc: ['id', 'title', 'content']
    };
    db.User
      .findAll({
        where: { id: req.params.id },
        include: [{
          model: db.Document, attributes: userDetails.doc
        }]
      })
      .then((user) => {
        if (!user)
          return res.status(404).send({ message: 'User was not found' });
        res.status(200).send({ message: user });
      });
  }

  static searchUser(req, res) {
    db.User
      .findAll({
        where: {
          username: { $iLike: `%${req.query.q}%` }
        }
      })
      .then((user) => {
        if (!user)
          return res.status(404).send({
            message: 'The user was not found'
          });
        if (user)
          return res.status(200).send({ 
            message: 'User found!',
            data: user
          });
      })
      .catch((err) => {
        res.status(404).send({
          message: 'There was a problem getting all users',
          err
        });
      });
  }

  static logoutUser(req, res) {
    res.status(200).send({
      message: 'You were logged out successfully'
    });
  }
}

export default UserController;