import React from 'react';
import { countries, api_host } from '../helpers'
import { Link } from 'react-router';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: []
    };
    this.gender = "";
  }

  submit(e) {
    e.preventDefault();

    const user = {
      username: this.usernameInput.value,
      password: this.passwordInput.value,
      confirmPassword: this.confirmPasswordInput.value,
      first_name: this.firstNameInput.value,
      last_name: this.lastNameInput.value,
      email: this.emailInput.value,
      phone: this.phoneInput.value,
      country: this.countryInput.value,
      province: this.provinceInput.value,
      city: this.cityInput.value,
      age: this.ageInput.value,
      gender: this.gender
    }

    if (this.validate(user)) {
      this.saveUser(user);
    }
  }

  validate(user) {
    let newErrors = [];
    if (user.username === "") {
      newErrors.push("Username can't be empty")
    }

    if (user.password === "") {
      newErrors.push("Password can't be empty")
    }

    if (user.password.length < 8 || user.password.size > 20) {
      newErrors.push("Password can't be shorter than 8 characters or longer than 20")
    }

    if (user.confirmPassword === "") {
      newErrors.push("Confirm Password can't be empty")
    }

    if (user.password !== user.confirmPassword) {
      newErrors.push("Yikes! Password and Confirm Password must match")
    }

    if (user.first_name === "") {
      newErrors.push("First Name can't be empty")
    }

    if (user.first_name.length > 30) {
      newErrors.push("Your first name can't be longer than 30 characters")
    }

    if (user.last_name === "") {
      newErrors.push("Last Name must be filled")
    }

    if (user.gender === "") {
      newErrors.push("You must select a gender")
    }

    if (parseInt(user.age, 10) < 12) {
      newErrors.push("Sorry, you're too young to be filling out this form")
    }

    if (user.province === "") {
      newErrors.push("Province can't be empty")
    }
    // errors is now == to newErrors
    this.setState({errors: newErrors})

    return (newErrors.length === 0);
  }

  saveUser(user) {

    let data = new FormData();

    for (let key in user) {
      data.append(key, user[key]);
    }

    fetch(`${api_host()}/signup.php`, {
      headers: {
        'Access-Control-Allow-Origin': `${window.location.protocol}//${window.location.host}`,
        'Accept': 'application/json'
      },
      mode: 'cors',
      method: 'post',
      body: data
    }).then(function(response) {
      return response.json();
    }).then(function(json) {
      if (json.result === true) {
        sessionStorage.user = JSON.stringify(json.user);
        this.context.router.transitionTo('/welcome');
      } else {
        this.setState({
          errors: json.errors
        });
      }
    }.bind(this));
  }

  changeGender(e) {
    // this.gender stores the gender value
    this.gender = e.target.value;
  }

  render() {
    return(
      <div id="signup-wrapper">
        <div className="inner-container">
          <form onSubmit={this.submit.bind(this)}>
            {this.renderErrors()}
            <div className="input-field">
              <input type="text" placeholder="Username" id="username" ref={(input) => { this.usernameInput = input}} />
            </div>
            <div className="input-field">
              <input type="password" placeholder="Password" ref={(input) => { this.passwordInput = input}} />
            </div>
            <div className="input-field">
              <input type="password" placeholder="Confirm Password" ref={(input) => { this.confirmPasswordInput = input}} />
            </div>
            <div className="input-field">
              <input type="text" placeholder="First Name" ref={(input) => { this.firstNameInput = input}} />
            </div>
            <div className="input-field">
              <input type="text" placeholder="Last Name" ref={(input) => { this.lastNameInput = input}} />
            </div>
            <div className="input-field">
              <input type="email" placeholder="Email" ref={(input) => { this.emailInput = input}} />
            </div>
            <div className="input-field">
              <input type="tel" placeholder="Phone Number" ref={(input) => { this.phoneInput = input}} />
            </div>
            <div className="input-field">
              <select ref={(input) => { this.countryInput = input}}>
                <option key="placeholder" value="">Country</option>
                {this.renderCountries()}
              </select>
            </div>
            <div className="input-field">
              <input type="text" placeholder="Province" ref={(input) => { this.provinceInput = input}}/>
            </div>
            <div className="input-field">
              <input type="text" placeholder="City" ref={(input) => { this.cityInput = input}}/>
            </div>
            <div className="input-field">
              <select ref={(input) => { this.ageInput = input}}>
                <option key="placeholder" value="">Age</option>
                {this.renderAges()}
              </select>
            </div>
            <div className="input-field for-radio">
              <label><input type="radio" name="gender" value="male" onChange={this.changeGender.bind(this)} /> Male</label>
              <label><input type="radio" name="gender" value="female" onChange={this.changeGender.bind(this)} /> Female</label>
              <label><input type="radio" name="gender" value="other" onChange={this.changeGender.bind(this)} /> Other</label>
            </div>
            <div className="input-field">
              <button className="button">Submit</button>
              <Link to='/' className="button">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // this would be like countries.map do |country| end
  // each child in an array or operator needs a key
  renderCountries() {
    return countries().map(function(country) {
      return (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      )
    });
  }

  renderAges() {
    let options = [];
    for (let age = 1; age <= 100; age++) {
      options.push(
        <option key={age} value={age}>{age}</option>
      )
    }
    return options;
  }

  renderErrors() {
    if (this.state.errors.length > 0) {
      return (
        <ul className="errors">
          {this.renderErrorValues()}
        </ul>
      )
    }
  }

  renderErrorValues() {
    return this.state.errors.map(function(error, index) {
      return (
        <li key={index}>{error}</li>
      )
    });
  }
}

SignUp.contextTypes = {
  router: React.PropTypes.object
}

export default SignUp;
