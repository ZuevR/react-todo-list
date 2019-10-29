import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Validator from '../../utils/Validator';
import style from './style.module.css';
import AuthService from '../../services/AuthService';

const errorInputStyle = {
  backgroundImage: 'none',
};

class SignIn extends Component {
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
      case 'email':
        return this.validateField(value, input);
      case 'password':
        return this.validateField(value, input);
      default:
        return false;
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
  onFormSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { history, checkUser } = this.props;
    const data = {
      email: email.value,
      password: password.value,
    };
    try {
      await AuthService.signIn(data);
      history.push('/todo-list');
      checkUser();
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : 'something broke';
      this.setState({
        formError: errorMessage,
      });
    }
  };

  render() {
    const { email, password, formError } = this.state;
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="form-wrapper col-xl-4 col-lg-5 col-md-7 col-sm-9 col-xs-12">
            <h1 className="text-center mt-5">Login form</h1>
            <form className={`mt-5 ${style.form}`} onSubmit={this.onFormSubmit}>
              <div className={style.errorBlock}>
                {formError
                && <div className="text-center text-light bg-danger p-1">{formError}</div>}
              </div>
              <div className="form-group row mt-2">
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
              <Link to="/sign-up">
                <div className="mt-4 text-muted text-center">Do not have account?</div>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  checkUser: PropTypes.func.isRequired,
};

export default withRouter(SignIn);
