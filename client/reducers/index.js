import { combineReducers } from 'redux';
import authReducer from './authReducers';
import { documentList, addDocument, documentPage, editDocument } from './documentReducers';

const reducers = combineReducers({
  authReducer,
  documentList,
  addDocument,
  documentPage,
  editDocument
});

export default reducers;
