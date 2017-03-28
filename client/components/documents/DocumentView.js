import React, { PropTypes } from 'react';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Chip from 'material-ui/Chip';
// import Gravatar from 'react-gravatar';
// import md5 from 'blueimp-md5';

const DocumentView = props => (
  <div className="container">
    <Card>
      <CardHeader
        className="card-header"
        textStyle={{ paddingLeft: 10, verticalAlign: 'middle' }}
        title={`${props.document.User.firstName} ${props.document.User.lastName} `}
        subtitle={`Created on: ${new Date(props.document.createdAt).toUTCString()}`}
        showExpandableButton
        actAsExpander
      >
        <Gravatar email={md5(props.document.User.email)} style={{ float: 'left' }} size={50} rating="pg" default="identicon" className="CustomAvatar-image" />
      </CardHeader>
      <CardTitle title={`Title: ${props.document.title}`} actAsExpander />
      <Chip style={{ margin: 10 }}>
        {props.document.access}
      </Chip> <br />
      <CardText className="card-text" expandable >
        <h5>{props.document.title}</h5> <br />
        {props.document.content}
      </CardText>
    </Card>
  </div>
  );
Document.PropTypes = {
  document: PropTypes.object.isRequired
};
export default DocumentView;
