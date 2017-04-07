import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import { loginSuccessful, logoutSuccess, logout } from '../../actions/authActions';
import AppBar from 'material-ui/AppBar';

const Header = (props) => {
  return (
    <div>
      <AppBar
        style={{background: '#ac3b61'}}
        title="HATI"
        titleStyle={{color: 'white'}}
        iconElementRight={
          <span>
            <FlatButton label="Profile" style={{color: 'white'}}/>
            <FlatButton label="LOGOUT" onClick={props.logout}
              style={{color: 'white'}}/>
          </span>
        }
      />
    </div>
    );
}

export default Header;
