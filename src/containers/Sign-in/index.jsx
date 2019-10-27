import React, { Component } from 'react';
import Index from '../../utils/validator';
import s from './style.module.css';

const errorInput = {
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
        errorMessage: false,
      },
      password: {
        value: '',
        valid: false,
        blurred: false,
        errorMessage: false,
      },
      isFormValid: false,
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
      case 'email': return this.validateEmail(value);
      case 'password': return this.validatePassword(value);
      default: return false;
    }
  };

  validateEmail = (value) => {
    let message = false;
    if (Index.required(value)) message = 'The email is required';
    this.setState((prevState) => ({
      email: {
        ...prevState.email,
        errorMessage: message,
        valid: !message,
      },
    }), () => {
      this.checkSubmit();
    });
  };

  validatePassword = (value) => {
    let message = false;
    if (Index.required(value)) message = 'The password is required';
    this.setState((prevState) => ({
      password: {
        ...prevState.password,
        errorMessage: message,
        valid: !message,
      },
    }), () => {
      this.checkSubmit();
    });
  };

  checkSubmit = () => {
    const { email, password } = this.state;
    this.setState({
      isFormValid: email.valid && password.valid,
    });
  };

  /* ========= Other ========= */
  onFormSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const { email, password, isFormValid } = this.state;
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="form-wrapper col-xl-4 col-lg-5 col-md-7 col-sm-9 col-xs-12">
            <h1 className="text-center mt-5">Login form</h1>
            <form className={`mt-5 ${s.form}`} onSubmit={this.onFormSubmit}>
              <div className="form-group row">
                <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${email.blurred && !email.valid ? 'is-invalid error-input' : false}`}
                    style={errorInput}
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
                    style={errorInput}
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
                disabled={!isFormValid}
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
