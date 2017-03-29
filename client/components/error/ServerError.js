import React from 'react';
import { Route } from 'react-router';
import AppError from './AppError';

const ServerError = () => (
  <AppError>
    <center>
      <h2 className="title">The Proverbial Internal Server Error :/</h2>
      <div className="container-fluid">
        <p>The minions broke something :(</p>
        <p>Go back maybe? <i className="material-icons">mood</i></p>
        <button type="button" className="btn btn-block"><Route path="/">HOME</Route></button>
      </div>
    </center>
  </AppError>
);

export default ServerError;
