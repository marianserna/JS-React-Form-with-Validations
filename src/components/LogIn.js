import React from 'react';
import { Link } from 'react-router';
import { api_host } from '../helpers';

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: []
    };
  }

  login(e) {
    e.preventDefault();
    this.validate();
  }

  validate() {
    let newErrors = [];
    if (this.usernameInput.value === "") {
      newErrors.push("Username can't be empty")
    }

    if (this.passwordInput.value === "") {
      newErrors.push("Password can't be empty")
    }

    if (newErrors.length > 0) {
      this.setState({
        errors: newErrors
      });
    } else {
      this.remoteValidate();
    }
  }

  remoteValidate() {
    let data = new FormData();
    data.append('username', this.usernameInput.value);
    data.append('password', this.passwordInput.value);

    fetch(`${api_host()}/login.php`, {
      headers: {
        'Access-Control-Allow-Origin': `${window.location.protocol}//${window.location.host}`,
        'Accept': 'application/json'
      },
      mode: 'cors',
      method: 'post',
      body: data
    }).then(function(response) {
      return response.json();
    }).then(function(json) {
      if (json.result === true) {
        sessionStorage.user = JSON.stringify(json.user);
        this.context.router.transitionTo('/welcome');
      } else {
        this.setState({
          errors: json.errors
        });
      }
    }.bind(this));
  }

  render() {
    return(
      <div id="login-wrapper">
        <div className="inner-container">
          <form onSubmit={this.login.bind(this)}>
            {this.renderErrors()}
            <div className="input-field">
              <input type="text" placeholder="Username" ref={(input) => { this.usernameInput = input}} />
            </div>
            <div className="input-field">
              <input type="password" placeholder="Password" ref={(input) => { this.passwordInput = input}} />
            </div>
            <div className="input-field">
              <button className="button">Log In</button>
              <Link to='/' className="button">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    )
  }

  renderErrors() {
    if (this.state.errors.length > 0) {
      return (
        <ul className="errors">
          {this.renderErrorValues()}
        </ul>
      )
    }
  }

  renderErrorValues() {
    return this.state.errors.map(function(error, index) {
      return (
        <li key={index}>{error}</li>
      )
    });
  }
}

LogIn.contextTypes = {
  router: React.PropTypes.object
}

export default LogIn;
