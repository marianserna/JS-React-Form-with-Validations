import React from 'react';
import { Link } from 'react-router';

class LogIn extends React.Component {
  render() {
    return(
      <form>
        <input type="email" />
        <input type="password"/>
        <button>Log In</button>
        <Link to='/'>CANCEL</Link>
      </form>
    )
  }
}

export default LogIn;
