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
      <h2>Welcome, {this.state.user.username}</h2>
    )
  }
}

export default Welcome;
