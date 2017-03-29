import React from 'react';

class SignUpPage extends React.Component {
  render() {
    return (
      <div className="text-center">
        <main>
          <center>
            <div className="section" />

            <h5 className="black-text">Create a new account</h5>
            <div className="section" />
            <div className="container">
              <form className="col s12 reg-form" method="post">
                <div className="row">
                  <div className="input-field col s6">
                    <i className="material-icons prefix">account_circle</i>
                    <input type="text" className="validate" id="fname" />
                    <label htmlFor="fname">First Name</label>
                  </div>
                  <div className="input-field col s6">
                    <i className="material-icons prefix">account_circle</i>
                    <input type="text" className="validate" id="lname" />
                    <label htmlFor="lname">Last Name</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <i className="material-icons prefix">account_circle</i>
                    <input type="text" className="validate" id="username" />
                    <label htmlFor="username"> Username </label>
                  </div>
                  <div className="input-field col s6">
                    <i className="material-icons prefix">email</i>
                    <input type="email" className="validate" id="email" />
                    <label htmlFor="email">Email Address</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <i className="material-icons prefix">lock</i>
                    <input type="password" className="validate" id="password" />
                    <label htmlFor="password">Password</label>                  
                  </div>
                  <div className="input-field col s6">
                    <i className="material-icons prefix">lock</i>
                    <input type="password" className="validate" id="confirm" />
                    <label htmlFor="confirm">Confirm Password</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col s6">
                    <button type="submit" className="waves-effect waves-light btn-custom" name="action">
                      Register <i className="material-icons right">send</i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </center>
    <div className="section"></div>
    <div className="section"></div>
  </main>
      </div>
    );
  }

  /**
   *
   */
  componentDidMount() {
        $('#password').on('focusout', function (e) {
        if ($(this).val() != $('#repeat-password').val()) {
        $('#repeat-password').removeClass('valid').addClass('invalid');
    } else {
        $('#repeat-password').removeClass('invalid').addClass('valid');
    }
});

$('#repeat-password').on('keyup', function (e) {
    if ($('#password').val() != $(this).val()) {
        $(this).removeClass('valid').addClass('invalid');
    } else {
        $(this).removeClass('invalid').addClass('valid');
    }
});
  }
}
export default SignUpPage;
