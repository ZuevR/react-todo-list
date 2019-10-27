import React, { PureComponent } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Index from '../../Validator';
import s from './style.module.css';
import { API_URL } from '../../constants';
import AuthService from '../../auth';

const errorInput = {
  backgroundImage: 'none',
};

export default class SignUp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        valid: false,
        blurred: false,
        errorMessage: false,
      },
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
      formError: false,
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
      formError: false,
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
      case 'name':
        return this.validateName(value);
      case 'email':
        return this.validateEmail(value);
      case 'password':
        return this.validatePassword(value);
      default:
        return false;
    }
  };

  validateName = (value) => {
    let message = false;
    if (Index.required(value)) message = 'The name is required';
    this.setState((prevState) => ({
      name: {
        ...prevState.name,
        errorMessage: message,
        valid: !message,
      },
    }), () => {
      this.checkSubmit();
    });
  };

  validateEmail = (value) => {
    let message = false;
    if (Index.required(value)) {
      message = 'The email is required';
    } else if (Index.isEmail(value)) {
      message = 'Incorrect Email';
    }
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
    if (Index.required(value)) {
      message = 'The password is required';
    } else if (Index.minLength(value, 6)) {
      message = 'The password should contain 6 characters at least';
    }
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
    const { name, email, password } = this.state;
    this.setState({
      isFormValid: name.valid && email.valid && password.valid,
    });
  };

  /* ========= Other ========= */
  setFormError = (message) => {
    this.setState({
      formError: message,
    });
  };

  onFormSubmit = async (event) => {
    const { name, email, password } = this.state;
    event.preventDefault();
    try {
      const response = await axios({
        method: 'POST',
        url: `${API_URL}/auth/sign-up`,
        data: {
          name: name.value,
          email: email.value,
          password: password.value,
        },
      });
      AuthService.setToken(response.data);
    } catch (error) {
      const errorMessage = error.response.data.message || 'something broke';
      this.setFormError(errorMessage);
    }
  };

  render() {
    const {
      email,
      name,
      password,
      isFormValid,
      formError,
    } = this.state;
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="form-wrapper col-xl-4 col-lg-5 col-md-7 col-sm-9 col-xs-12">
            <h1 className="text-center mt-5">Registration form</h1>
            <form className={`${s.form} mt-5`} onSubmit={this.onFormSubmit}>
              <div className={s.errorBlock}>
                {formError && <div className="text-center text-light bg-danger p-1">{formError}</div>}
              </div>
              <div className="form-group row mt-2">
                <label htmlFor="name" className="col-sm-3 col-form-label">Name</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className={`form-control ${name.blurred && !name.valid ? 'is-invalid' : false}`}
                    style={errorInput}
                    value={name.value}
                    onFocus={this.onFormInputFocus}
                    onChange={this.onFormInputChange}
                    onBlur={this.onFormInputBlur.bind(null, 'name')}
                  />
                  <div className="invalid-feedback">{name.errorMessage}</div>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${email.blurred && !email.valid ? 'is-invalid' : false}`}
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
                    className={`form-control ${password.blurred && !password.valid ? 'is-invalid' : false}`}
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
              <Link to="/sign-in">
                <div className="mt-4 text-muted text-center">Already have account?</div>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
