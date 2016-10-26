import React from 'react';
import { Link } from 'react-router';

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: []
    };
  }

  login(e) {
    e.preventDefault();
    if (this.validate()) {
      this.context.router.transitionTo('/welcome');
    }
  }

  validate() {
    let newErrors = [];
    if (this.usernameInput.value === "") {
      newErrors.push("Username can't be empty")
    }

    if (this.passwordInput.value === "") {
      newErrors.push("Password can't be empty")
    }

    if(newErrors.length === 0) {

      if (localStorage.user === undefined || localStorage.user === null) {
        newErrors.push('Your username or password is incorrect');
      } else {
        const user = JSON.parse(localStorage.user);
        if (user.username !== this.usernameInput.value || user.password !== this.passwordInput.value) {
          newErrors.push('Your username or password is incorrect');
        }
      }
    }

    this.setState({errors: newErrors})

    return (newErrors.length === 0);
  }


  render() {
    return(
      <form onSubmit={this.login.bind(this)}>
        {this.renderErrors()}
        <input type="text" ref={(input) => { this.usernameInput = input}} />
        <input type="password" ref={(input) => { this.passwordInput = input}} />
        <button>Log In</button>
        <Link to='/'>CANCEL</Link>
      </form>
    )
  }

  renderErrors() {
    return (
      <ul>
        {this.renderErrorValues()}
      </ul>
    )
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
