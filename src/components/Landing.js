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
          <Link to='/login' className="button log">Log In</Link>
          <Link to='/signup' className="button sign">Sign Up</Link>
        </div>
      </div>
    )
  }
}

export default Landing;
