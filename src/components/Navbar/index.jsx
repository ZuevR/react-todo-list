import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './style.module.css';
import logo from '../../assets/images/site-logo.png';
import AuthService from '../../services/AuthService';

const activeStyle = {
  color: '#ffffff',
  textDecoration: 'underline',
};

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
  }

  onNavToggleClick = () => {
    this.setState((prevState) => ({
      showMenu: !prevState.showMenu,
    }));
  };

  logout = () => {
    const { checkUser } = this.props;
    AuthService.logout();
    checkUser();
  };

  render() {
    const { showMenu } = this.state;
    const { user } = this.props;
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-secondary">
        <button className="navbar-toggler" type="button" onClick={this.onNavToggleClick}>
          <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse" style={showMenu ? { display: 'block' } : null}>
          <a
            href="https://exceed-team.com"
            target="_blank"
            className="navbar-brand d-none d-md-block"
            rel="noopener noreferrer"
          >
            <img src={logo} className={style.logo} alt="logo"/>
          </a>
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            {!user && (
              <>
                <li className="nav-item mx-1">
                  <NavLink to="/sign-up" className="nav-link" activeStyle={activeStyle}>
                    Sign up
                  </NavLink>
                </li>
                <li className="nav-item mx-1">
                  <NavLink to="/sign-in" className="nav-link" activeStyle={activeStyle}>
                    Sign in
                  </NavLink>
                </li>
              </>
            )}
            {user && (
              <li className="nav-item mx-1">
                <button
                  type="button"
                  className="btn shadow-none nav-link"
                  onClick={this.logout}
                >
                  {`Logout (${user.name})`}
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
  checkUser: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  user: null,
};
