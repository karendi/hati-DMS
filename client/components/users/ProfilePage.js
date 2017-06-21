import React, {PropTypes} from 'react';
import {Card, CardActions, CardTitle, CardMedia, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Gravatar from 'react-gravatar';
import md5 from 'blueimp-md5';
import DocumentContainer from '../../containers/Documents/DocumentContainer';
import CreateDocumentContainer from '../../containers/Documents/CreateDocumentContainer';
import AppBar from 'material-ui/AppBar';
import CreateIcon from 'material-ui/svg-icons/content/create';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ValidationError from '../Auth/Validation';
import Header from '../common/Header';

const ProfilePage = (props) => {
  return(
    <div>
      <Header />
      <div className='row col-md-10 col-md-offset-1 col-sm-12' style={{padding: 20}}>
        <div className='col-md-4 col-sm-4' >
          {!props.userStateInfo.isEditing ?
            <Card style={{maxWidth: 350, marginTop: 30}}>
              <CardMedia overlay={<CardTitle title={props.user.username} />}>
                <Gravatar email={md5(props.user.email)} size={300} rating="pg"
                          default="identicon" className="CustomAvatar-image img-responsive" />
              </CardMedia>
              <CardText>
                {props.user.email}
              </CardText>
              {props.canEdit(props.user) ?
                <CardActions>
                  <FlatButton label='Edit Profile' onClick={props.editUserToggle}
                              icon={<CreateIcon />} primary={true} />
                </CardActions> : <span></span>}
            </Card> :
            <Card style={{maxWidth: 350, marginTop: 30}}>
              <CardMedia overlay={<CardTitle title={props.user.username} />}>
                <Gravatar email={md5(props.user.email)} size={300} rating="pg"
                          default="identicon" className="CustomAvatar-image" />
              </CardMedia>
              <CardText>
                <TextField
                  hintText = "Username"
                  floatingLabelText="Username"
                  name='username'
                  onChange={props.onChange}
                  onBlur={props.onBlur}
                  defaultValue={props.user.username}
                /><br/>
                <TextField
                  hintText="Email"
                  floatingLabelText="Email"
                  name='email'
                  onChange={props.onChange}
                  onBlur={props.onBlur}
                  defaultValue={props.user.email}
                /><br/>
                {!!props.errors.errors.email && <ValidationError error={props.errors.errors.email}/>}
                <TextField
                  hintText="Password"
                  floatingLabelText="Password"
                  name='password'
                  type='password'
                  onChange={props.onChange}
                /><br/>
                <TextField
                  hintText="Confirm Password"
                  floatingLabelText="Confirm Password"
                  name='confirmPassword'
                  type='password'
                  onChange={props.onChange}
                  onBlur={props.onBlur}
                /><br/>
                {!!props.errors.errors.confirmPassword && <ValidationError error={props.errors.errors.confirmPassword}/>}
                {props.auth.role.title === 'admin' ?
                  <SelectField
                    floatingLabelText='Role'
                    name='role'
                    onChange={props.onRoleChange}
                    value={props.user.role || 'user'}
                  >
                    {props.roles.map((role) => (
                      <MenuItem value={role._id} primaryText={role.title} />
                    ))}
                  </SelectField> : <span></span>}
              </CardText>
              <CardActions>
                <FlatButton label='Submit' onClick={() => props.onSubmit(props.user)} primary={true}/>
                <FlatButton label='Cancel' onClick={props.onClose} primary={true}/>
              </CardActions>
            </Card>
          }
        </div>
        <div className='col-md-8 col-sm-8' >
          <DocumentContainer selectedDocuments={props.documents}/>
          <CreateDocumentContainer/>
        </div>
      </div>
    </div>
  );
};

ProfilePage.propTypes = {
  userStateInfo: PropTypes.object,
  errors: PropTypes.object,
  onRoleChange: PropTypes.func,
  documents: PropTypes.array,
  roles: PropTypes.array,
  user: PropTypes.object,
  auth: PropTypes.object,
  editUserToggle: PropTypes.func,
  onTitleTouchTap: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onLogOut: PropTypes.func,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  canEdit: PropTypes.func
};

export default ProfilePage;
