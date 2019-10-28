import React, { Component } from 'react';
import Validator from '../../utils/Validator';
import style from './style.module.css';

const errorInputStyle = {
  backgroundImage: 'none',
};

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        value: '',
        valid: false,
        blurred: false,
        errorMessage: '',
      },
      password: {
        value: '',
        valid: false,
        blurred: false,
        errorMessage: '',
      },
    };
  }

  /* ========= Handlers ========= */
  onFormInputFocus = (event) => {
    const { name, value } = event.target;
    this.checkValidation(name, value);
  };

  onFormInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      [name]: {
        ...prevState[name],
        blurred: false,
        value,
      },
    }));
    this.checkValidation(name, value);
  };

  onFormInputBlur = (input) => {
    this.setState((prevState) => ({
      [input]: {
        ...prevState[input],
        blurred: true,
      },
    }));
  };

  /* ========= Validation ========= */
  checkValidation = (input, value) => {
    switch (input) {
      case 'email': return this.validateField(value, input);
      case 'password': return this.validateField(value, input);
      default: return false;
    }
  };

  validateField = (value, field) => {
    let errorMessage = '';
    if (Validator.required(value)) errorMessage = `The ${field} is required`;
    this.setState((prevState) => ({
      [field]: {
        ...prevState[field],
        errorMessage,
        valid: !errorMessage,
      },
    }));
  };

  /* ========= Other ========= */
  onFormSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="form-wrapper col-xl-4 col-lg-5 col-md-7 col-sm-9 col-xs-12">
            <h1 className="text-center mt-5">Login form</h1>
            <form className={`mt-5 ${style.form}`} onSubmit={this.onFormSubmit}>
              <div className="form-group row">
                <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${email.blurred && !email.valid ? 'is-invalid error-input' : false}`}
                    style={errorInputStyle}
                    id="email"
                    value={email.value}
                    onFocus={this.onFormInputFocus}
                    onChange={this.onFormInputChange}
                    onBlur={this.onFormInputBlur.bind(null, 'email')}
                  />
                  <div className="invalid-feedback">{email.errorMessage}</div>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
                <div className="col-sm-9">
                  <input
                    type="password"
                    name="password"
                    className={`form-control ${password.blurred && !password.valid ? 'is-invalid error-input' : false}`}
                    style={errorInputStyle}
                    id="password"
                    value={password.value}
                    onFocus={this.onFormInputFocus}
                    onChange={this.onFormInputChange}
                    onBlur={this.onFormInputBlur.bind(null, 'password')}
                  />
                  <div className="invalid-feedback">{password.errorMessage}</div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-secondary mt-3"
                disabled={!(email.valid && password.valid)}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
