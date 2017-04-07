import React, { PropTypes } from 'react';
import SignUpForm from './SignUpForm';
import { userSignupRequest } from '../../../actions/authActions';
import AppBar from 'material-ui/AppBar';

class SignUpPage extends React.Component {
  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <center>
          <AppBar
            style={{background: '#ac3b61'}}
            title="Hati"
            showMenuIconButton={false}
          />
        </center>
        <SignUpForm />
      </div>
    );
  }
}

export default SignUpPage;
