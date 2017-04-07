import isEmpty from 'lodash/isEmpty';
import * as types from '../actions/types';
import * as tokenUtils from '../utils/tokenUtils';

const authReducer = (state = { isFetching: false, isAuthenticated: !!tokenUtils.getAuthToken() }, action) => {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    case types.LOGIN_USER:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
      });
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        user: action.user.user
      });
    case types.LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message.message
      });
    case types.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        user: null
      });
    case types.SIGNUP_USER:
      return Object.assign({}, state, {
        isFetching: true,
        isSignedUp: false,
      });
    case types.SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isSignedUp: true,
        errorMessage: '',
      });
    case types.SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isSignedUp: false,
        errorMessage: 'Server Error.'
      });
    default:
      return state;
  }
};

export default authReducer;
