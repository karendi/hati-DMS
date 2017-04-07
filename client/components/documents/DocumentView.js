import React, { PropTypes } from 'react';
import Chip from 'material-ui/Chip';
import Gravatar from 'react-gravatar';
import md5 from 'blueimp-md5';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Header from '../common/Header';

const styles = {
  titleStyle: {
    color: '#ffffff'
  }
};

// TODO Time
const owner =  window.localStorage.getItem('userName')

const DocumentView = props => (
  <div>
    <GridList
      cellHeight={180} cols={1}>
        <GridTile
          title={`Title: ${props.document.title}`}
          titleStyle={styles.titleStyle}
          titleBackground="linear-gradient(to right, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        >
          <h5>{props.document.title}</h5><Chip backgroundColor="#123c69" labelColor="#ffffff"> {props.document.access} </Chip> <br />
          {props.document.content}
        </GridTile>
    </GridList>
  </div>
  );

DocumentView.PropTypes = {
  document: PropTypes.object.isRequired
};

export default DocumentView;
