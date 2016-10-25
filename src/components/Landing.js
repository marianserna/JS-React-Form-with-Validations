import React from 'react';
import { Link } from 'react-router';

class Landing extends React.Component {
  render() {
    return(
      <div className='container'>
        <div className="left">
          <Link to='/login'>Log In</Link>
        </div>
        <div className="middle"></div>
        <div className="right">
          <Link to='/signup'>Sign Up</Link>
        </div>
      </div>
    )
  }
}

export default Landing;
