import request from 'superagent';
import * as tokenUtils from '../utils/tokenUtils';
import * as types from './types';

export const signUpUser = (user) => {
  return { type: types.SIGNUP_USER, user};
};

export const logoutUser = () => {
  return { type: types.LOGOUT_USER};
};

export const logoutSuccess = () => {
  return {
    type: types.LOGOUT_SUCCESS
  };
};

export const logoutFailure = (message) => {
  return { type: types.LOGOUT_FAILURE, message};
};

export const loginSuccessful = (user) => {
  return {
    type: types.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token: user.token,
    user
  };
};

export const loginFailed = (message) => {
  return {
    type: types.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message: JSON.parse(message.text)

  };
};

// export const checkIfUserExists = (identifier) => {
//   return dispatch => {
//     return request.get(`/api/users/${identifier}`);
//   };
// };

export const setCurrentUser = (user) => {
  return {
    type: types.SET_CURRENT_USER,
    user
  };
};

export const LoginUser = (user) => {
  return { type: types.LOGIN_USER, user};
}

export const userSignupRequest = (userData) => {
  return (dispatch) => {
    dispatch(signUpUser(userData));
    return (
     request
      .post('/api/users')
      .send(userData)
      .then((response) => {
        window.localStorage.setItem('token', response.body.token);
        dispatch(loginSuccessful(response.body));
      })
      .catch((error) => {
        dispatch(loginFailed(error.response));
      })
    );
  };
};

export const login = (userData) => {
  return (dispatch) => {
    dispatch(LoginUser(userData));
    return (
     request
      .post('/api/users/login')
      .send(userData)
      .then((response) => {
        window.localStorage.setItem('token', response.body.token);
        dispatch(loginSuccessful(response.body));
      })
      .catch((error) => {
        dispatch(loginFailed(error.response));
      })
    );
  };
};


export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('token');
    dispatch(logoutUser());
  };
};

// export const logout = () => {
//   return dispatch => {
//     dispatch(logoutUser());
//     return (
//       request
//       .post('/api/users/logout')
//       .then(() => {
//         tokenUtils.removeAuthToken();
//         dispatch(logoutSuccess());
//       })
//       .catch((error) => {
//         console.log(error.response, error);
//         dispatch(logoutFailure(error.response));
//       })
//     );
//   };
// };
