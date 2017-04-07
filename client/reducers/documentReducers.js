import * as types from '../actions/types';

const accessFilter = (state = '', action) => {
  switch (action.type) {
    case types.SET_DOCUMENTS_ACCESS_FILTER:
      return action.accessFilter;
    default:
      return state;
  }
};

const searchFilter = (state = '', action) => {
  switch (action.type) {
    case types.SET_DOCUMENTS_SEARCH_FILTER:
      return action.searchFilter;
    default:
      return state;
  }
};

const DOCUMENT_LIST_INITIAL_STATE = {
  documents: [],
  error: null,
  loading: false,
  accessFilter: '',
  searchFilter: '',
};

export const documentList = (state = DOCUMENT_LIST_INITIAL_STATE, action) => {
  switch (action.type) {
    case types.DOCUMENTS_REQUEST:
      return Object.assign({}, state, {
        documents: [],
        error: null,
        loading: true,
      });
    case types.DOCUMENTS_SUCCESS:
      return Object.assign({}, state, {
        documents: action.document,
        error: null,
        loading: false,
      });
    case types.DOCUMENTS_FAILURE:
      return Object.assign({}, state, {
        documents: [],
        error: action.error,
        loading: false,
      });
    case types.DOCUMENTS_ADD_SUCCESS:
      return Object.assign({}, state, {
        documents: [action.document, ...state.documents],
      });
    case types.DOCUMENT_DELETE_SUCCESS:
      return Object.assign({}, state, {
        documents: state.documents.filter(id => id !== action.documentId),
      });
    case types.SET_DOCUMENTS_ACCESS_FILTER:
    case types.SET_DOCUMENTS_SEARCH_FILTER:
      return Object.assign({}, state, {
        accessFilter: accessFilter(state.accessFilter, action),
        searchFilter: searchFilter(state.searchFilter, action),
      });
    default:
      return state;
  }
};

export const addDocument = (state = { error: null, loading: false, document: null }, action) => {
  switch (action.type) {
    case types.DOCUMENTS_ADD_REQUEST:
      return {
        error: null,
        loading: true,
        document: null,
      };
    case types.DOCUMENTS_ADD_SUCCESS:
      return {
        error: null,
        loading: false,
        document: action.document,
      };
    case types.DOCUMENTS_ADD_FAILURE:
      return {
        error: action.error,
        loading: false,
        document: null,
      };
    default:
      return state;
  }
};

export const documentPage = (state = { document: null, error: null, loading: false }, action) => {
  switch (action.type) {
    case types.DOCUMENT_GET_REQUEST:
      return {
        document: null,
        error: null,
        loading: true,
      };
    case types.DOCUMENT_GET_SUCCESS:
      return {
        document: action.response.result,
        error: null,
        loading: false,
      };
    case types.DOCUMENT_GET_FAILURE:
      return {
        document: null,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export const editDocument = (state = { error: null, loading: false }, action) => {
  switch (action.type) {
    case types.DOCUMENT_UPDATE_REQUEST:
      return {
        error: null,
        loading: true,
      };
    case types.DOCUMENT_UPDATE_SUCCESS:
      return {
        error: null,
        loading: false,
      };
    case types.DOCUMENT_UPDATE_FAILURE:
      return {
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};
