import express from 'express';
import DocumentController from './controllers/DocumentController';
import Authentication from './middleware/Auth';

const documentRouter = express.Router();

documentRouter.route('/')
  .get(Authentication.verifyUser, DocumentController.listAllDocuments)
  .post(Authentication.verifyUser, DocumentController.createDocument);

documentRouter.get('/search', Authentication.verifyUser, DocumentController.searchDocument);

documentRouter.route('/:id')
  .get(Authentication.verifyUser, DocumentController.getSpecificDocument)
  .put(Authentication.verifyUser, DocumentController.updateDocument)
  .delete(Authentication.verifyUser, DocumentController.deleteDocument);

export default documentRouter;
