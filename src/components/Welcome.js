import React from 'react';
import { Link } from 'react-router';

class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {
      user: JSON.parse(sessionStorage.user)
    };
  }

  render() {
    return(
      <div className="welcome-container">
        <div className="welcome-inner">
          <h2 className="welcome">Welcome, {this.state.user.username}!</h2>
          <div className="input-field">
            <Link to='/' className="button">Exit</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Welcome;
