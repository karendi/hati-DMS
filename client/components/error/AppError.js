import React, { PropTypes } from 'react';

const AppError = props => (
  <div>
    {props.children}
  </div>
);

AppError.propTypes = {
  children: PropTypes.node,
};

export default AppError;
