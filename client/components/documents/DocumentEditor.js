import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DocumentView from './DocumentView';

const DocumentEditor = props => (
  <div>
    <TextField
      name="title"
      hintText="Title"
      type="text"
      onChange={props.onTitleChange}
      defaultValue={props.doc.title}
      fullWidth
    /> <br /><br />

    <TextField
      className="content"
      name="content"
      type="text"
      onChange={props.onContentChange}
      defaultValue={props.doc.content}
      fullWidth
      hintText="Content"
      multiLine
      rows={2}
      rowsMax={10}
    /><br /> <br />

    <SelectField
      floatingLabelText="Access"
      value={props.doc.access}
      onChange={props.onSetAccess}
    >
      <MenuItem value={'public'} primaryText="Public" />
      <MenuItem value={'private'} primaryText="Private" />

    </SelectField>
  </div>
);

export default DocumentEditor;
