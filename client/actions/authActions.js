import request from 'superagent';
import jwtDecode from 'jwt-decode';
import * as tokenUtils from '../utils/tokenUtils';
import * as types from './types';

const signUpUser = (user) => {
  return { type: types.SIGNUP_USER, user};
};

const logoutUser = (user) => {
  return { type: types.LOGOUT_USER, user};
};

const loginSuccessful = (user) => {
  return {
    type: types.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: user.success,
    token: user.token,
    user
  };
}

const loginFailed = (message) => {
  return {
    type: types.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message: JSON.parse(message.text)

  };
}



// const checkIfUserExists = (identifier) => {
//   return dispatch => {
//     return request.get(`/api/users/${identifier}`);
//   };
// };

const setCurrentUser = (user) => {
  return {
    type: types.SET_CURRENT_USER,
    user
  };
};

const LoginUser = (user) => {
  return { type: types.LOGIN_USER, user};
}

const userSignupRequest = (userData) => {
  console.log(userData, "HERE");
  return (dispatch) => {
    dispatch(signUpUser(userData));
    console.log("HERE HERE HERE");
    return (
     request
      .post('/api/users')
      .send(userData)
      .then((response) => {
        console.log(response, response.body);
        tokenUtils.setAuthToken(response.body.token);
        dispatch(loginSuccessful(response.body));
      })
      .catch((error) => {
        dispatch(loginFailed(error.response));
      })
    );
  };
};

const login = (userData) => {
  console.log(userData, "HERE");
  return (dispatch) => {
    dispatch(LoginUser(userData));
    console.log("HERE HERE HERE");
    return (
     request
      .post('/api/users/login')
      .send(userData)
      .then((response) => {
        console.log(response, response.body, response.body.token);
        tokenUtils.setAuthToken(response.body.token);
        dispatch(loginSuccessful(response.body));
      })
      .catch((error) => {
        console.log(error.response, error);
        dispatch(loginFailed(error.response));
      })
    );
  };
};

const logout = () => {
  return dispatch => {
    tokenUtils.removeAuthToken();
    dispatch(logoutUser());
  };
};


export { setCurrentUser, logout, login, signUpUser, loginSuccessful, loginFailed, userSignupRequest, logoutUser };
