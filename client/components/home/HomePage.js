import React from 'react';
import { Link } from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
      <div className="text-center">
        <center>
          <h1>Hati DMS</h1>
          <p>Welcome to Hati!</p>
          <Link to="about" className="waves-effect waves-light btn btn-custom">Learn More</Link>
        </center>
      </div>
    );
  }
}
export default HomePage;
