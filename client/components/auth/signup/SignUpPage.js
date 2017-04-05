import React, { PropTypes } from 'react';
import SignUpForm from './SignUpForm';
import { userSignupRequest } from '../../../actions/authActions';


class SignUpPage extends React.Component {
  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <SignUpForm />
      </div>
    );
  }
}

export default SignUpPage;
