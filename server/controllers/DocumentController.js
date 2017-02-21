import db from '../models';

const documentDetails = (doc) => {
  const docAttributes = {
    title: doc.title,
    content: doc.content,
    access: doc.access,
    author: doc.author,
    ownerId: doc.ownerId,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt
  };
  return docAttributes;
};

class DocumentController {
  static createDocument(req, res) {
    db.Document
      .create({
        title: req.body.title,
        content: req.body.content,
        access: req.body.access || 'public',
        author: req.body.author || req.User.username,
        ownerId: req.decodedToken.userId,
        ownerRoleId: req.decodedToken.roleId
      })
       .then((document) => {
         document = docAttributes(document);
         res.status(201).send({
           message: 'Document created successfully', document
         });
       })
       .catch((err) => {
         res.status(400).send({
           message: 'There was an error while creating the document', err
         });
     });
  },

  static updateDocument(req, res) {
    db.Document
      .findById(req.params.id)
      .then((doc) => {
        if (!doc) {
          return res.status(404).send({ message: 'The document was not found' });
        }
        if (doc.ownerId === req.decodedToken.userId) {
          doc.update({
            title: req.body.title || doc.title,
            content: req.body.content || doc.content,
            access: req.body.access || doc.access,
            author: req.body.author || doc.author
          })
          .then((updatedDoc) => {
            updatedDoc = docAttributes(updatedDoc);
            return res.status(200).send({
              message: 'The document was updated successfully', updatedDoc
            });
          });
        } else {
          res.status(401).send({ message: 'Permission denied' });
        }
      });
  },

  static deteleDocument(req, res) {
    db.Document
      .findById(req.params.id)
      .then((doc) => {
        if (!doc) {
          return res.status(404).send({ message: 'The document was not found' });
        }
        if (doc.ownerId === req.decodedToken.userId) {
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
  },

  static listAllDocuments(req, res) {
    let query;
    if (req.decodedToken.roleId === 1) {
      query = { where: {} };
    } else {
      query = {
        where: {
          $or: [
            { access: 'public' },
            { ownerId: req.decodedToken.userId },
            {
              $and: [
                { access: 'role' },
                { ownerRoleId: req.decodedToken.roleId }
              ]
            }
          ]
        },
      };
    }
    query.docAttributes = [
      'id',
      'title',
      'content',
      'access',
      'author'
      'ownerId',
      'createdAt',
      'updatedAt'
    ];
    query.limit = req.query.limit || null;
    query.offset = req.query.offset || null;
    query.order = [['createdAt', 'DESC']];

    db.Document
      .findAll(query)
      .then((docs) => {
        res.status(200).send({ message: docs });
      });
  },

  static getSpecificDocument(req, res) {
    db.Document
      .findById(req.params.id)
      .then((doc) => {
        if (!doc) {
          return res.status(404).send({ message: 'The document was not found' });
        }
        if (doc.access === 'public' || doc.ownerId === req.decodedToken.userId) {
          doc = docAttributes(doc);
          return res.status(200).send({ message: doc });
        }
        if (doc.access === 'role' && doc.ownerRoleId === req.decodedToken.roleId) {
          doc = docAttributes(doc);
          return res.status(200).send({ message: doc });
        }
        res.status(401).send({ message: 'Permission denied' });
      });
  },

  static searchDocument(req, res) {

  }
}

export default DocumentController;
