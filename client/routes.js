import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import DocumentView from './containers/documents/DocumentViewContainer';
import LoginPage from './components/auth/login/LoginPage';
import SignUpPage from './components/auth/signup/SignUpPage';
import Dashboard from './components/dashboard/Dashboard';
import ProfilePage from './components/profile/ProfilePage';
import { logout } from './actions/authActions';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="dashboard" component={Dashboard} />
    <Route path="profile" component={ProfilePage} />
    <Route path="logout" onEnter={(nextState, replace) => {
     logout();
     replace('/');
   }}/>
    <Route path="login" component={LoginPage} />
    <Route path="signup" component={SignUpPage} />
  </Route>
);
