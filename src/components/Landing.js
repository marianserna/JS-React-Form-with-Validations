import React from 'react';
import { Link } from 'react-router';

class Landing extends React.Component {
  render() {
    return(
      <div className='container'>
        <div className="middle">
          <h2>
            <span id="color1">COLOR</span>
            <br/>
          <span id="color2">-MATIC</span>
          </h2>
        </div>

        <div className="inner-container">
          <div className="button">
            <Link to='/login' className="log">Log In</Link>
            <Link to='/signup' className="sign">Sign Up</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing;
