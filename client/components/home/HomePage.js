import React from 'react';
import { Link } from 'react-router';
import { Card, CardTitle } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import LoginPage from '../auth/login/LoginPage';
import AppBar from 'material-ui/AppBar';

const HomePage = () => {
  return (
  	<div>
	    <center>
	      <LoginPage />
	    </center>
    </div>
  );
};
export default HomePage;
