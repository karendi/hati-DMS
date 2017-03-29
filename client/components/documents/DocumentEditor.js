import React, { PropTypes } from 'react';

 class DocumentEditor extends React.Component {
  //  location.reload();
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange(event) {
  //   this.setState({value: content });
  // }

  handleSubmit(event) {
    // this.state.value = document.getElementById('editor1').value;
    event.preventDefault();
    alert('An essay was submitted: ' + this.state.value);
    
  }
  render() {
    return (
      <div className="doc-edit">
        <form className="document-form" onSubmit={this.handleSubmit}>
          <textarea name="editor" cols="100" rows="6" defaultValue={this.props.value}></textarea>
          <div className="doc-submit">
            <button type="submit" className="waves-effect waves-light btn-custom" name="action">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
  componentDidMount() {
    $(document).ready(function() {
    $('select').material_select();
    });
    const configuration = {
      toolbar: "Standard"
    };
    CKEDITOR.replace("editor", configuration);
    CKEDITOR.instances.editor.on('change', function () {
      let data = CKEDITOR.instances.editor.getData();
      // this.props.onChange(data);
      this.setState({ value: data });
      console.log(this);
    }.bind(this));
  }
}
export default DocumentEditor;


          // <input type="submit" className="button tick" value="Submit" />
