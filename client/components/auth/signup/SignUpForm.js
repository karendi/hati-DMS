import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import validateInput from '../../../utils/validation';
import { userSignupRequest } from '../../../actions/authActions';


class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: '',
      lName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
      isLoading: false,
      invalid: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.checkUserExists = this.checkUserExists.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state)
      .then(
        () => {
          this.context.router.push('/home');
        },
        err => this.setState({ errors: err.response.data, isLoading: false })
      );
    }
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  render() {
    const { errors } = this.state;
    return (
      <MuiThemeProvider>
        <center>
          <Card className="container">
            <form action="/" onSubmit={this.onSubmit}>
              <h2 className="card-heading">Sign Up</h2>

              { errors.form && <div className="alert alert-danger">{errors.form}</div> }

              <div className="field-line">
                <TextField
                  floatingLabelText="First Name"
                  name="fName"
                  errorText={errors.fName}
                  onChange={this.onChange}
                  value={this.state.fName}
                />
              </div>

              <div className="field-line">
                <TextField
                  floatingLabelText="Last Name"
                  name="lName"
                  errorText={errors.lName}
                  onChange={this.onChange}
                  value={this.state.lName}
                />
              </div>

              <div className="field-line">
                <TextField
                  floatingLabelText="Username"
                  name="username"
                  errorText={errors.username}
                  onChange={this.onChange}
                  // checkUserExists={this.checkUserExists}
                  value={this.state.username}
                />
              </div>

              <div className="field-line">
                <TextField
                  floatingLabelText="Email"
                  name="email"
                  errorText={errors.email}
                  onChange={this.onChange}
                  // checkUserExists={this.checkUserExists}
                  value={this.state.email}
                />
              </div>

              <div className="field-line">
                <TextField
                  floatingLabelText="Password"
                  type="password"
                  name="password"
                  onChange={this.onChange}
                  errorText={errors.password}
                  value={this.state.password}
                />
              </div>

              <div className="field-line">
                <TextField
                  floatingLabelText="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  onChange={this.onChange}
                  errorText={errors.confirmPassword}
                  value={this.state.confirmPassword}
                />
              </div>

              <div className="button-line">
                <RaisedButton type="submit" label="Create New Account" primary />
              </div>

              <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
            </form>
          </Card>
        </center>
      </MuiThemeProvider>
    );
  }
}

// SignUpForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   onChange: PropTypes.func.isRequired,
//   errors: PropTypes.object.isRequired,
//   user: PropTypes.object.isRequired
// }

SignUpForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
  // checkIfUserExists: React.PropTypes.func.isRequired
};

SignUpForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(null, { userSignupRequest })(SignUpForm);
