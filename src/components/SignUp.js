import React from 'react';
import { countries } from '../helpers'
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
      firstName: this.firstNameInput.value,
      lastName: this.lastNameInput.value,
      email: this.emailInput.value,
      phone: this.phoneInput.value,
      country: this.countryInput.value,
      province: this.provinceInput.value,
      city: this.cityInput.value,
      age: this.ageInput.value,
      gender: this.gender
    }
    // store forms input values into localStorage
    // Redirect user to fake dashboard
    this.validate(user);
  }

  validate(user) {
    let newErrors = [];
    if (user.username === "") {
      newErrors.push("Username can't be empty")
    }

    if (user.password === "") {
      newErrors.push("Password can't be empty")
    }

    if (user.password.size < 8 || user.password.size > 20) {
      newErrors.push("Password can't be shorter than 8 characters or longer than 20")
    }

    if (user.confirmPassword === "") {
      newErrors.push("Confirm Password can't be empty")
    }

    if (user.password !== user.confirmPassword) {
      newErrors.push("Yikes! Password and Confirm Password must match")
    }

    if (user.firstName === "") {
      newErrors.push("First Name can't be empty")
    }

    if (user.firstName.length > 30) {
      newErrors.push("Your first name can't be longer than 30 characters")
    }

    if (user.lastName === "") {
      newErrors.push("Last Name must be filled")
    }

    if (user.gender === "") {
      newErrors.push("You must select a gender")
    }

    if (parseInt(user.age) < 12) {
      newErrors.push("Sorry, you're too young to be filling out this form")
    }

    if (user.province === "") {
      newErrors.push("Province can't be empty")
    }
    // errors is now == to newErrors
    this.setState({errors: newErrors})
  }

  changeGender(e) {
    // this.gender stores the gender value
    this.gender = e.target.value;
  }

  render() {
    return(
      <form onSubmit={this.submit.bind(this)}>
        {this.renderErrors()}
        <div className="input-field">
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Username" id="username" ref={(input) => { this.usernameInput = input}} />
        </div>

        <input type="password" placeholder="Password" ref={(input) => { this.passwordInput = input}} />
        <input type="password" placeholder="Confirm Password" ref={(input) => { this.confirmPasswordInput = input}} />
        <input type="text" placeholder="First Name" ref={(input) => { this.firstNameInput = input}} />
        <input type="text" placeholder="Last Name" ref={(input) => { this.lastNameInput = input}} />
        <input type="email" placeholder="email" ref={(input) => { this.emailInput = input}} />
        <input type="tel" placeholder="Phone Number" ref={(input) => { this.phoneInput = input}} />
        <select ref={(input) => { this.countryInput = input}}>
          {this.renderCountries()}
        </select>
        <input type="text" placeholder="Province" ref={(input) => { this.provinceInput = input}}/>
        <input type="text" placeholder="City" ref={(input) => { this.cityInput = input}}/>
        <select ref={(input) => { this.ageInput = input}}>
          {this.renderAges()}
        </select>
        <div>
          <input type="radio" name="gender" value="male" onChange={this.changeGender.bind(this)} /> Male
          <input type="radio" name="gender" value="female" onChange={this.changeGender.bind(this)} /> Female
          <input type="radio" name="gender" value="other" onChange={this.changeGender.bind(this)} /> Other
        </div>

        <button>SUBMIT</button>
        <Link to='/'>CANCEL</Link>

      </form>
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
    return (
      <ul>
        {this.renderErrorValues()}
      </ul>
    )
  }

  renderErrorValues() {
    return this.state.errors.map(function(error, index) {
      return (
        <li key={index}>{error}</li>
      )
    });
  }
}

export default SignUp;
