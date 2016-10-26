import React from 'react';

class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  // before filter (before React initializes this component)
  componentWillMount() {
    this.setState({
      user: JSON.parse(localStorage.user)
    });
  }

  render() {
    return(
      <div className="welcome-container">
        <h2 className="welcome">Welcome, {this.state.user.username}!</h2>
      </div>
    )
  }
}

export default Welcome;
