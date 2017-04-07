import React, { PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DocumentView from './DocumentView';

const DocumentList = ({ documents, handleOpen, style }) => (
  <div>
    {documents.map(document =>
      <DocumentView key={document.id} document={document} />
      )}
    <div>
      <FloatingActionButton onClick={handleOpen} style={style}>
        <ContentAdd />
      </FloatingActionButton>
    </div>
  </div>
  );
DocumentList.PropTypes = {
  documents: PropTypes.array.isRequired,
};

export default DocumentList;
