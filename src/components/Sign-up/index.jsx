import React, { PureComponent } from 'react';
import Validator from '../../Validator/Validator';
import './style.css';

export default class SignUp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        error: false,
      },
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

  setErrorMessage = (field, message) => {
    this.setState((prevState) => ({
      [field]: {
        ...prevState[field],
        error: message,
      },
    }), () => {
      console.log(this.state);
    });
  };

  validateInput = (input) => {
    const { state } = this;
    switch (input) {
      case 'name': {
        if (Validator.required(state[input].value)) {
          this.setErrorMessage(input, 'The name is required');
          break;
        }
        this.setErrorMessage(input, '');
        break;
      }
      case 'email': {
        if (Validator.required(state[input].value)) {
          this.setErrorMessage(input, 'The email is required');
          break;
        }
        if (Validator.isEmail(state[input].value)) {
          this.setErrorMessage(input, 'Incorrect email');
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
        if (Validator.minLength(state[input].value, 6)) {
          this.setErrorMessage(input, 'The password should contain 6 characters at least');
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

  isFormValid = () => {
    const { state } = this;
    const errorFields = Object.keys(state);
    for (let i = 0; i < errorFields.length; i += 1) {
      if (state[errorFields[i].error] !== '') return false;
    }
    return true;
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.isFormValid());
  };

  render() {
    console.log('render');
    const { email, name, password } = this.state;
    return (
      <div className="form-wrapper col-xl-4 col-lg-5 col-md-7 col-sm-9 col-xs-12">
        <h1 className="text-center mt-5">Registration form</h1>
        <form className="mt-5 app-form" onSubmit={this.onFormSubmit}>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-3 col-form-label">Name</label>
            <div className="col-sm-9">
              <input
                type="text"
                name="name"
                id="name"
                className={`form-control ${name.error ? 'is-invalid error-input' : false}`}
                value={name.value}
                onChange={this.onFormInputChange}
                onBlur={this.validateInput.bind(null, 'name')}
              />
              <div className="invalid-feedback">{name.error}</div>
            </div>
          </div>
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
