import React from 'react';
import { Route } from 'react-router';
import AppError from './AppError';

const AccessDenied = () => (
  <AppError>
    <center>
      <h2 className="title">Access Denied :/</h2>
      <div className="container-fluid">
        <p>Looks like they locked you out :(</p>
        <p>Go back maybe? <i className="material-icons">mood</i></p>
        <button type="button" className="btn btn-block"><Route path="/">HOME</Route></button>
      </div>
    </center>
  </AppError>
);

export default AccessDenied;
