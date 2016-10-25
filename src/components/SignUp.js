import React from 'react';

class SignUp extends React.Component {
  submit(e) {
    e.preventDefault();
    console.log(this.nameInput);
    // finish building form: Create refs for every input
    // validate inputs: use state
    // store forms input values into localStorage
    // Redirect user to fake dashboard
  }

  render() {
    return(
      <form onSubmit={this.submit.bind(this)}>
        <input type="text" placeholder="name" ref={(input) => { this.nameInput = input}} />
        <button>Sign Up</button>
      </form>
    )
  }
}

// Allow signup access to the router (Sign up button must take me to sign up page)
// Can do it this way:
// SignUp.contextTypes = {
//   router: React.PropTypes.object
// }

export default SignUp;
