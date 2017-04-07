import React from 'react';
import DocumentViewContainer from '../../containers/documents/DocumentViewContainer';
import Header from '../common/Header';

/**
 *
 */
class Dashboard extends React.Component {
  render() {
    return (
      <div>
      	<Header />
        <DocumentViewContainer />
      </div>
    );
  }
}
export default Dashboard;
