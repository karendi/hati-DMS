import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/Homepage';
import AboutPage from './components/about/AboutPage';
import DocumentView from './components/documents/DocumentView';
import LoginPage from './components/auth/LoginPage';
import SignUpPage from './components/auth/SignUpPage';
import Dashboard from './components/dashboard/Dashboard';
import ProfilePage from './components/profile/ProfilePage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="dashboard" component={Dashboard} />
    <Route path="documents" component={DocumentView} />
    <Route path="about" component={AboutPage} />
    <Route path="profile" component={ProfilePage} />
    <Route path="login" component={LoginPage} />
    <Route path="signup" component={SignUpPage} />
  </Route>
);
