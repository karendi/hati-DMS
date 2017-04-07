import React, { PropTypes } from 'react';

class App extends React.Component {

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
App.PropTypes = {
  children: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default App;
