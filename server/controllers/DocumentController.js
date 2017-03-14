import db from '../models';

class DocumentController {
  static createDocument(req, res) {
    db.Document
      .create({
        title: req.body.title,
        content: req.body.content,
        access: req.body.access || 'public',
        userId: req.decodedToken.userId,
        userRoleId: req.decodedToken.roleId
      })
     .then((document) => {
       res.status(201).send({
         message: 'Document created successfully',
         data: document
       });
     })
     .catch((err) => {
       res.status(400).send({
         message: 'There was an error while creating the document', err
       });
     });
  }

  static updateDocument(req, res) {
    db.Document
      .findById(req.params.id)
      .then((doc) => {
        if (!doc) {
          return res.status(404).send({ message: 'The document was not found' });
        }
        if (parseInt(doc.userId, 10) === req.decodedToken.userId) {
          doc.update({
            title: req.body.title || doc.title,
            content: req.body.content || doc.content,
            access: req.body.access || doc.access
          })
          .then((updatedDoc) => {
            return res.status(200).send({
              message: 'The document was updated successfully',
              data: updatedDoc
            });
          });
        } else {
          res.status(401).send({ message: 'Permission denied' });
        }
      });
  }

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
          })
        } else {
          res.status(401).send({
            message: ' Permission denied'
          });
        }
      });
  }

  static listAllDocuments(req, res) {
    const docAttributes = {
      doc: ['id', 'title', 'content', 'access', 'userId', 'createdAt', 'updatedAt'],
      user: ['id', 'username']
    }
    let query;
    if (req.decodedToken.roleId === 1) {
      query = { where: {} };
    } else {
      query = {
        where: {
          $or: [
            { access: 'public' },
            { userId: req.decodedToken.userId },
            {
              $and: [
                { access: 'role' },
                { userRoleId: req.decodedToken.roleId }
              ]
            }
          ]
        },
      };
    }
    query = { attributes: docAttributes.doc };
    query.limit = req.query.limit || null;
    query.offset = req.query.offset || null;
    query.order = [['createdAt', 'DESC']];

    db.Document
      .findAll(query)
      .then((docs) => {
        res.status(200).send({ message: 'Listing all documents', docs });
      });
  }

  static getSpecificDocument(req, res) {
    db.Document
      .findById(req.params.id)
      .then((doc) => {
        if (!doc) {
          return res.status(404).send({ message: 'The document was not found' });
        }
        if (doc.access === 'public' || doc.userId === req.decodedToken.userId) {
          return res.status(200).send({ message: "Document found!", data: doc });
        }
        if (doc.access === 'role' && doc.userRoleId === req.decodedToken.roleId) {
          return res.status(200).send({ message: "Document found!", data: doc });
        }
        res.status(401).send({ message: 'Permission denied' });
      });
  }

  static searchDocument(req, res) {
    if (!req.query.query) {
      return res.send({ message: 'Search cannot be empty' });
    }
    const query = {
      where: {
        $and: [
          {
            $or: [
              { access: 'public' },
              { ownerId: req.decodedToken.userId },
              { $and: [
                { access: 'role' },
                { ownerRoleId: req.decodedToken.roleId }
              ] }
            ]
          },
          {
            $or: [
              { title: { like: `%${req.query.query}%` } },
              { content: { like: `%${req.query.query}%` } }
            ]
          }
        ]
      },
      limit: req.query.limit || null,
      offset: req.query.offset || null,
      order: [['createdAt', 'DESC']]
    };
    db.Document
      .findAll(query)
      .then((queriedDoc) => {
        res.status(200).send({ message: queriedDoc });
      });
  }
}

export default DocumentController;
