export const getAuthToken = () => {
  return window.localStorage.getItem('token');
};

export const setAuthToken = (token) => {
  return window.localStorage.setItem('token', token);
};

export const removeAuthToken = () => {
  return window.localStorage.removeItem('token');
};

export const getUserFromToken = () => {
  const token = getAuthToken();
  return token ? JSON.parse(window.atob(token.split('.')[0])) : null;
};
