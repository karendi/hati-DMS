// This component handles the App template
import React, { PropTypes } from 'react';
import Header from './common/header';

class App extends React.Component {

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}
App.PropTypes = {
  children: PropTypes.object.isRequired
};

export default App;
