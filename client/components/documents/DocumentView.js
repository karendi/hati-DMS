import React, { PropTypes } from 'react';
import Chip from 'material-ui/Chip';
import Gravatar from 'react-gravatar';
import md5 from 'blueimp-md5';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Header from '../common/Header';
import { getUserFromToken } from '../../utils/tokenUtils';
const styles = {
  titleStyle: {
    color: '#ffffff'
  }
};

// TODO Time

const DocumentView = props => (
  <div>
    <GridList
      cellHeight={180} cols={1}>
      { getUserFromToken().userId === props.document.userId ?
        <IconMenu
          style={{ float: 'right' }}
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem primaryText="Edit Document" onTouchTap={() =>
            props.onUpdate(props.document)} />
          <MenuItem
            primaryText="Delete Document" onTouchTap={() => {
            props.deleteDocument(props.document.id)
              .then(() => {
                props.listDocuments();
              });
          }
          }
          />
        </IconMenu> : <span />
      }
        <GridTile
          title={`Title: ${props.document.title}`}
          titleStyle={styles.titleStyle}
          titleBackground="linear-gradient(to right, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        >
          <h3>{props.document.title}</h3><br/><h5>{props.document.docOwner}</h5><br/><Chip backgroundColor="#123c69" labelColor="#ffffff"> {props.document.access} </Chip> <br />
          {props.document.content}
        </GridTile>
    </GridList>
  </div>
  );

DocumentView.PropTypes = {
  document: PropTypes.object.isRequired
};

export default DocumentView;
