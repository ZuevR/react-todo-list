import React, { Component } from 'react';
import Validator from '../../Validator/Validator';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        value: '',
        error: false,
      },
      password: {
        value: '',
        error: false,
      },
    };
  }

  validateInput = (input) => {
    const { state } = this;
    switch (input) {
      case 'email': {
        if (Validator.required(state[input].value)) {
          this.setErrorMessage(input, 'The email is required');
          break;
        }
        this.setErrorMessage(input, '');
        break;
      }
      case 'password': {
        if (Validator.required(state[input].value)) {
          this.setErrorMessage(input, 'The password is required');
          break;
        }
        this.setErrorMessage(input, '');
        break;
      }
      default:
        state[input].error = false;
    }
  };

  onFormInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      [name]: {
        ...prevState[name],
        value,
      },
    }));
  };

  setErrorMessage = (field, message) => {
    this.setState((prevState) => ({
      [field]: {
        ...prevState[field],
        error: message,
      },
    }));
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.isFormValid());
  };


  render() {
    console.log('render');
    const { email, password } = this.state;
    return (
      <div className="form-wrapper col-xl-4 col-lg-5 col-md-7 col-sm-9 col-xs-12">
        <h1 className="text-center mt-5">Login form</h1>
        <form className="mt-5 app-form" onSubmit={this.onFormSubmit}>
          <div className="form-group row">
            <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
            <div className="col-sm-9">
              <input
                type="email"
                name="email"
                className={`form-control ${email.error ? 'is-invalid error-input' : false}`}
                id="email"
                value={email.value}
                // onFocus={this.setErrors.bind(null, 'email', email.value)}
                onChange={this.onFormInputChange}
                onBlur={this.validateInput.bind(null, 'email')}
              />
              {email.error && <div className="invalid-feedback">{email.error}</div>}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
            <div className="col-sm-9">
              <input
                type="password"
                name="password"
                className={`form-control ${password.error ? 'is-invalid error-input' : false}`}
                id="password"
                value={password.value}
                // onFocus={this.setErrors.bind(null, 'password', password.value)}
                onChange={this.onFormInputChange}
                onBlur={this.validateInput.bind(null, 'password')}
              />
              {password.error && <div className="invalid-feedback">{password.error}</div>}
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-secondary mt-3"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
