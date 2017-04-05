const getAuthToken = () => {
  return window.localStorage.getItem('token');
};

const setAuthToken = (token) => {
  return window.localStorage.setItem('token', token);
};

const removeAuthToken = () => {
  return window.localStorage.removeItem('token');
};

const getUserFromToken = () => {
  const token = getAuthToken();
  return token ? JSON.parse(window.atob(token.split('.')[0])) : null;
};

export { getAuthToken, setAuthToken, removeAuthToken, getUserFromToken };
