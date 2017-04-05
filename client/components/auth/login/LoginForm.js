import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import loginValidate from '../../../utils/loginValidation';
import { login } from '../../../actions/authActions';


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      isLoading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(
        res => this.context.router.push('/home'),
        err => this.setState({ errors: err.response.data.errors, isLoading: false })
      );
    }
  }

  isValid() {
    console.log(this.state, 'HERE');
    const { errors, isValid } = loginValidate(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  render() {
    const { errors, email, password, isLoading } = this.state;

    return(
      <MuiThemeProvider>
        <center>
          <Card className="container">
            <form action="/" onSubmit={this.onSubmit}>
              <h2 className="card-heading">Login</h2>

              { errors.form && <div className="alert alert-danger">{errors.form}</div> }

              <div className="field-line">
                <TextField
                  floatingLabelText="Email"
                  name="email"
                  errorText={errors.email}
                  onChange={this.onChange}
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

              <div className="button-line">
                <RaisedButton type="submit" disabled={isLoading} label="Log in" primary />
              </div>

              <CardText>{"Don't have an account?"}<Link to={'/signup'}>Register</Link>.</CardText>
            </form>
          </Card>
        </center>
      </MuiThemeProvider>
    );
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired
};

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(null, { login })(LoginForm);
