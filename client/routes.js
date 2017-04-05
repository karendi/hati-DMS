import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import DocumentEditor from './components/documents/DocumentEditor';
import LoginPage from './components/auth/login/LoginPage';
import SignUpPage from './components/auth/signup/SignUpPage';
import Dashboard from './components/dashboard/Dashboard';
import ProfilePage from './components/profile/ProfilePage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="home" component={Dashboard} />
    <Route path="documents" component={DocumentEditor} />
    <Route path="about" component={AboutPage} />
    <Route path="profile" component={ProfilePage} />
    <Route path="login" component={LoginPage} />
    <Route path="signup" component={SignUpPage} />
  </Route>
);
