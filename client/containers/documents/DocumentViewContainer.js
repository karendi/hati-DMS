import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { listDocuments, createDocument } from '../../actions/documentActions';
import DocumentView from '../../components/documents/DocumentView';
import DocumentList from '../../components/documents/DocumentList';
import DocumentEditor from '../../components/documents/DocumentEditor';

const style = {
  position: 'fixed',
  bottom: 20,
  right: 20,
  marginRight: 20,
};

class DocumentViewContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      document: {
        title: '',
        content: '',
        access: ''
      }
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSetAccess = this.onSetAccess.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
  }
  componentWillMount() {
    this.props.listDocuments();
  }
  onSetAccess(event, index, value) {
    const doc = this.state.document;
    doc.access = value;
    this.setState({ document: doc });
  }
  onTitleChange(event) {
    const doc = this.state.document;
    doc.title = event.target.value;
    this.setState({ document: doc });
  }
  onContentChange(event) {
    const doc = this.state.document;
    doc.content = event.target.value;
    this.setState({ document: doc });
  }
  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    console.log(this.props, "PROPS");
    const viewActions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Create Document"
        primary
        keyboardFocused
        onTouchTap={(e) => {
          e.preventDefault();
          this.props.createDocument(this.state.document);
          this.props.listDocuments();
          this.handleClose();
        }}
      />,
    ];
    return (
      <div className="container">
        <div>
          {this.props.documentList.documents.map(document =>
            <DocumentView key={document.id} document={document} />
            )}
          <div>
            <FloatingActionButton onClick={this.handleOpen} backgroundColor="#123c69" style={style}>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </div>
        <br />
        <Dialog
          title="Create a new Document"
          actions={viewActions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <DocumentEditor
            style={style}
            onSetAccess={this.onSetAccess}
            doc={this.state.document}
            onTitleChange={this.onTitleChange}
            onContentChange={this.onContentChange}
          />

        </Dialog>
      </div>
    );
  }
}
DocumentViewContainer.PropTypes = {
  documentList: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  console.log(state.documentList, "STATE")
  return {
    documentList: state.documentList
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(listDocuments, createDocument, dispatch)
  };
}
export default connect(mapStateToProps, {listDocuments, createDocument})(DocumentViewContainer);
