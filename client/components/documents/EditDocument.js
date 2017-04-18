import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};
class EditDocument extends React.Component {
  render() {
    return (
      <div>
        <form>
          <TextField
            type="text"
            name="title"
            placeholder="Title"
            defaultValue={this.props.title}
            onChange={this.props.onChange}
            fullWidth={true}
          />
          <br />
          <TextField
            type="text"
            name="content"
            placeholder="Content"
            defaultValue={this.props.content}
            onChange={this.props.onChange}
            multiLine={true}
            fullWidth={true}
          />
          <br />
          <TextField
            type="text"
            name="access"
            label="Access"
            defaultValue={this.props.access}
            onChange={this.props.onChange}
            fullWidth={true}
          />
          <br />
          <RaisedButton
            primary={true}
            style={style}
            type="submit"
            label="Update"
            disabled={this.props.saving}
            className="btn btn-primary"
            onClick={this.props.onSubmit}
          />
        </form>
      </div>
    );
  }
}

EditDocument.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.string,
  access: PropTypes.string,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func
};

export default EditDocument;
