const db = require('../models/Index.js');

/**
 * Document Controller
 *
 * Creates the DocumentController
 * @class
 */
class DocumentController {
  /**
   * createDocument
   *
   * Creates a new document
   * @param {object} req The request object
   * @param {object} res The response object
   * @returns {void}
   */
  static createDocument(req, res) {
    if (!req.body.title && !req.body.content) {
      return res.status(400).send({ message: 'Required fields cannot be blank' });
    }
    if (!req.body.title || (req.body.title).split(' ').length < 1) {
      return res.status(400).send({ message: 'Title field should have atleast 1 word' });
    }
    if (!req.body.content || (req.body.content).split(' ').length < 3) {
      return res.status(400).send({ message: 'Content field should have atleast 3 words' });
    }
    const title = req.body.title;
    const content = req.body.content;
    db.Document
      .findOne({
        where: { title, content }
      })
      .then((result) => {
        if (result) {
          return res.status(409).send({
            success: false,
            message: 'Document already exists'
          });
        }
        return db.Document
          .create({
            title: req.body.title,
            content: req.body.content,
            access: req.body.access || 'public',
            userId: req.decodedToken.userId,
            userRoleId: req.decodedToken.roleId
          })
         .then((document) => {
           res.status(201).send(document
           );
         })
         .catch(() => {
           res.status(400).send({
             error: 'There was an error while creating the document'
           });
         });
      });
  }

  /**
   * updateDocument
   *
   * Updates an existing document
   * @param {object} req The request object
   * @param {object} res The response object
   * @returns {void}
   */
  static updateDocument(req, res) {
    db.Document
      .findById(req.params.id)
      .then((doc) => {
        if (!doc) {
          return res.status(404).send({ message: 'The document was not found' });
        }
        if (!req.body.title && !req.body.content) {
          return res.status(406).send({
            message: 'No update detected'
          });
        }
        if (parseInt(doc.userId, 10) === req.decodedToken.userId) {
          doc.update({
            title: req.body.title || doc.title,
            content: req.body.content || doc.content,
            access: req.body.access || doc.access
          })
          .then((updatedDoc) => {
            res.status(200).send({
              message: 'The document was updated successfully',
              data: updatedDoc
            });
          });
        } else {
          res.status(401).send({ message: 'Updating a different user\'s documents is not allowed' });
        }
      });
  }

  /**
   * deleteDocument
   *
   * Deletes a specific document
   * @param {object} req The request object
   * @param {object} res The response object
   * @returns {void}
   */
  static deleteDocument(req, res) {
    db.Document
      .findById(req.params.id)
      .then((doc) => {
        if (!doc) {
          return res.status(404).send({ message: 'The document was not found' });
        }
        if (parseInt(doc.userId, 10) === req.decodedToken.userId) {
          doc.destroy()
          .then(() => {
            res.status(200).send({
              message: 'The document was deleted successfully'
            });
          });
        } else {
          res.status(405).send({
            message: 'Deleting other users\' documents is not allowed.'
          });
        }
      });
  }

  /**
   * listAllDocuments
   *
   * Lists public documents
   * @param {object} req The request object
   * @param {object} res The response object
   * @returns {void}
   */
  static listAllDocuments(req, res) {
    const docAttributes = {
      doc: ['id', 'title', 'content', 'access', 'userId', 'createdAt', 'updatedAt'],
      user: ['id', 'username']
    };
    let query;
    if (req.decodedToken.roleId === 1) {
      query = { where: {} };
    } else {
      query = {
        where: {
          access: 'public'
        }
      };
    }
    query.attributes = docAttributes.doc;
    query.limit = req.query.limit || null;
    query.offset = req.query.offset || null;
    query.order = [['createdAt', 'DESC']];
    db.Document
      .findAll({ where: query.where, order: query.order, limit: query.limit, offset: query.offset })
      .then((docs) => {
        if (req.decodedToken.roleId === 1) {
          res.status(200).send( docs );
        } else {
          res.status(200).send( docs );
        }
      });
  }

  /**
   * getSpecificDocument
   *
   * Gets a specific document
   * @param {object} req The request object
   * @param {object} res The response object
   * @returns {void}
   */
  static getSpecificDocument(req, res) {
    db.Document
      .findById(req.params.id)
      .then((doc) => {
        if (!doc) {
          return res.status(404).send({ message: 'The document was not found' });
        }
        if (doc.access === 'public' || doc.userId === req.decodedToken.userId) {
          return res.status(200).send({ message: 'Document found!', data: doc });
        }
        if (doc.access === 'role' && doc.userRoleId === req.decodedToken.roleId) {
          return res.status(200).send({ message: 'Document found!', data: doc });
        }
        res.status(401).send({ message: 'Permission denied' });
      });
  }

  /**
   * searchDocument
   *
   * Searches documents
   * @param {object} req The request object
   * @param {object} res The response object
   * @returns {void}
   */
  static searchDocument(req, res) {
    const searchTerm = req.query.q;
    if (!Object.keys(req.query).length || !searchTerm) {
      return res.status(400).send({ message: 'Input a valid search term' });
    }
    const query = {
      attributes: ['title', 'content'],
      where: {
        access: 'public',
        $or: [
        { title: { $iLike: `%${searchTerm}%` } },
        { content: { $iLike: `%${searchTerm}%` } }
        ]
      }
    };
    db.Document
      .findAll(query)
      .then((queriedDoc) => {
        if (queriedDoc.length === 0) {
          return res.status(404).send({
            message: 'No results were found'
          });
        }
        if (req.decodedToken.roleId === 1) {
          res.status(200).send({
            message: 'Search results from all documents',
            data: queriedDoc
          });
        } else {
          res.status(200).send({
            message: 'Search results from public documents',
            data: queriedDoc
          });
        }
      });
  }
}

module.exports = DocumentController;
