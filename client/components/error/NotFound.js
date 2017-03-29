import React from 'react';
import { Route } from 'react-router';
import AppError from './AppError';

const NotFound = () => (
  <AppError>
    <center>
      <h2 className="title">Oops! Not Found</h2>
      <div className="container-fluid">
        <p>We looked everywhere. Everywhere! <i className="material-icons">mood_bad</i></p>
        <p>Go back maybe? <i className="material-icons">mood</i></p>
        <button type="button" className="btn btn-block"><Route path="/">HOME</Route></button>
      </div>
    </center>
  </AppError>
);

export default NotFound;
