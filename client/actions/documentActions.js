import request from 'superagent';
import jwtDecode from 'jwt-decode';
import * as tokenUtils from '../utils/tokenUtils';
import * as types from './types';

export const closeDocument = () => {
  return {
    type: types.CLOSE_DOCUMENT
  };
};

export const documentsRequest = () => {
  return {
    type: types.DOCUMENTS_REQUEST
  };
};

export const documentsSuccess = (document) => {
  return {
    type: types.DOCUMENTS_SUCCESS,
    document
  };
};

export const documentsFailure = (document) => {
  return {
    type: types.DOCUMENTS_FAILURE,
    document
  };
};

export const documentsAddRequest = (document) => {
  return {
    type: types.DOCUMENTS_ADD_REQUEST,
    document
  };
};

export const documentsAddSuccess = (document) => {
  return {
    type: types.DOCUMENTS_ADD_SUCCESS,
    document
  };
};

export const documentsAddFailure = (document) => {
  return {
    type: types.DOCUMENTS_ADD_FAILURE,
    document
  };
};

export const documentsGetRequest = () => {
  return {
    type: types.DOCUMENTS_GET_REQUEST
  };
};

export const documentsGetSuccess = (document) => {
  return {
    type: types.DOCUMENTS_GET_SUCCESS,
    document
  };
};

export const documentsGetFailure = (document) => {
  return {
    type: types.DOCUMENTS_GET_FAILURE,
    document
  };
};

export const documentsUpdateRequest = (document) => {
  return {
    type: types.DOCUMENTS_UPDATE_REQUEST,
    document
  };
};

export const documentsUpdateSuccess = (document) => {
  return {
    type: types.DOCUMENTS_UPDATE_SUCCESS,
    document
  };
};

export const documentsUpdateFailure = (document) => {
  return {
    type: types.DOCUMENTS_UPDATE_FAILURE,
    document
  };
};

export const documentsDeleteRequest = () => {
  return {
    type: types.DOCUMENTS_DELETE_REQUEST
  };
};

export const documentsDeleteSuccess = (document) => {
  return {
    type: types.DOCUMENTS_DELETE_SUCCESS,
    document
  };
};

export const documentsDeleteFailure = (document) => {
  return {
    type: types.DOCUMENTS_DELETE_FAILURE,
    document
  };
};

export const documentsAccessFilter = (accessFilter) => {
  return {
    type: types.SET_DOCUMENTS_ACCESS_FILTER,
    accessFilter
  };
};

export const documentsSearchFilter = (searchFilter) => {
  return {
    type: types.SET_DOCUMENTS_SEARCH_FILTER,
    searchFilter
  };
};

export const listDocuments = () => {
  console.log("HERE");
  return dispatch => {
    console.log("HERE");
    dispatch(documentsRequest());
    return (
      request
        .get('/api/documents')
        .set('authorization', window.localStorage.getItem('token'))
        .then((response) => {
          dispatch(documentsSuccess(response.body));
        })
        .catch((error) => {
          dispatch(documentsFailure(error));
        })
    );
  };
};

export const createDocument = (docData) => {
  return dispatch => {
    dispatch(documentsAddRequest(docData));
    return (
      request
      .post('/api/documents')
      .set('authorization', window.localStorage.getItem('token'))
      .send(docData)
      .then((response) => {
        dispatch(documentsAddSuccess(response.body));
      })
      .catch((error) => {
        dispatch(documentsAddFailure(error.response));
      })
    );
  };
};

export const updateDocument = (docData) => {
  return dispatch => {
    dispatch(documentsUpdateRequest(docData));
    return (
      request
      .put(`/api/documents/${docData.id}`)
      .set('authorization', window.localStorage.getItem('token'))
      .send(docData)
      .then((response) => {
        dispatch(documentsUpdateSuccess(response.body));
      })
      .catch((error) => {
        dispatch(documentsUpdateFailure(error.response));
      })
    );
  };
};

export const deleteDocument = (documentId) => {
  return dispatch => {
    dispatch(documentsDeleteRequest());
    return (
      request
      .delete(`/api/documents/${documentId}`)
      .set('authorization', window.localStorage.getItem('token'))
      .then((response) => {
        dispatch(documentsDeleteSuccess(response.body));
      })
      .catch((error) => {
        dispatch(documentsDeleteFailure(error.response));
      })
    );
  };
};

export const getDocument = (documentId) => {
  return dispatch => {
    dispatch(documentsGetRequest());
    return (
      request
      .get(`/api/documents/${documentId}`)
      .set('authorization', window.localStorage.getItem('token'))
      .then((response) => {
        dispatch(documentsGetSuccess(response.body));
      })
      .catch((error) => {
        dispatch(documentsGetFailure(error.response));
      })
    );
  };
};
