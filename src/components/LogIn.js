import React from 'react';

class LogIn extends React.Component {
  render() {
    return(
      <form>
        <input type="email" />
        <input type="password"/>
        <button>Log In</button>
      </form>
    )
  }
}

export default LogIn;
