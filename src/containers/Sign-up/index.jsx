import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Validator from '../../utils/Validator';
import AuthService from '../../auth';
import style from './style.module.css';

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
        errorMessage: '',
      },
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
    let errorMessage = '';
    if (Validator.required(value)) errorMessage = 'The name is required';
    this.setState((prevState) => ({
      name: {
        ...prevState.name,
        errorMessage,
        valid: !errorMessage,
      },
    }));
  };

  validateEmail = (value) => {
    let errorMessage = '';
    if (Validator.required(value)) {
      errorMessage = 'The email is required';
    } else if (Validator.isEmail(value)) {
      errorMessage = 'Incorrect Email';
    }
    this.setState((prevState) => ({
      email: {
        ...prevState.email,
        errorMessage,
        valid: !errorMessage,
      },
    }));
  };

  validatePassword = (value) => {
    let errorMessage = '';
    if (Validator.required(value)) {
      errorMessage = 'The password is required';
    } else if (Validator.minLength(value, 6)) {
      errorMessage = 'The password should contain 6 characters at least';
    }
    this.setState((prevState) => ({
      password: {
        ...prevState.password,
        errorMessage,
        valid: !errorMessage,
      },
    }));
  };

  /* ========= Other ========= */

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const { authService } = this.props;
    const data = {
      name: name.value,
      email: email.value,
      password: password.value,
    };
    try {
      const response = await authService.signUp(data);
      authService.setToken(response.data);
    } catch (error) {
      const errorMessage = error.response.data.message || 'something broke';
      this.setState({
        formError: errorMessage,
      });
    }
  };

  render() {
    const {
      email,
      name,
      password,
      formError,
    } = this.state;
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="form-wrapper col-xl-4 col-lg-5 col-md-7 col-sm-9 col-xs-12">
            <h1 className="text-center mt-5">Registration form</h1>
            <form className={`${style.form} mt-5`} onSubmit={this.onFormSubmit}>
              <div className={style.errorBlock}>
                {formError
                && <div className="text-center text-light bg-danger p-1">{formError}</div>}
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
                disabled={!(name.valid && email.valid && password.valid)}
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

SignUp.propTypes = {
  authService: PropTypes.instanceOf(AuthService).isRequired,
};
