import React, { PropTypes } from 'react';
import LoginForm from './LoginForm';
import AppBar from 'material-ui/AppBar';

class LoginPage extends React.Component {
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
        <LoginForm />
      </div>
    );
  }
}

export default LoginPage;
