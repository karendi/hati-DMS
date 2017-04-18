import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { updateDocument, deleteDocument, listDocuments} from '../../actions/documentActions';
import EditDocument from '../../components/documents/EditDocument';

class EditDocumentPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(props, this.props, props.document, this.props.document, this.documentList, this.state, 'Edit Props!');
    this.state = {
      open: true,
      document: {
        id: props.document.id,
        title: props.document.title,
        content: props.document.content,
        access: props.document.access
      }
    };
    console.log(props, this.props, props.document, this.props.document, this.documentList, this.state, 'Edit Props!');
    this.state.open = true;
    this.onSubmit = this.onSubmit.bind(this);
    this.updateDoc = this.updateDoc.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  updateDoc(event) {
    const field = event.target.name;
    const doc = this.state.document;
    document[field] = event.target.value;
    return this.setState({ document: doc });
  }

  onSubmit() {
    this.props.updateDocument(this.state.document);
    this.context.router.push('/dashboard');
    this.setState({ open: false });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    console.log(this.state, this.props, 'HERE');
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <Dialog
        title="Edit Document"
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        <div>
          {console.log(this.state.document.id, this.props.document.document.id, this.props.document.id, 'Looking for that ID')}
          <EditDocument
            id={this.props.document.id}
            title={this.props.document.title}
            content={this.props.document.content}
            access={this.props.document.access}
            onSubmit={this.onSubmit}
            onChange={this.updateDoc}
          />
        </div>
      </Dialog>
    );
  }
}

EditDocumentPage.propTypes = {
  updateDocument: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  listDocuments: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  document: PropTypes.object.isRequired
};

EditDocumentPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    document: state.document
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, { updateDocument, deleteDocument, listDocuments })(EditDocumentPage);
