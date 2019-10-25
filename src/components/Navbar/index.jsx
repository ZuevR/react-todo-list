import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/site-logo.png';

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

  render() {
    const { showMenu } = this.state;
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-secondary">
        <button className="navbar-toggler" type="button" onClick={this.onNavToggleClick}>
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" style={showMenu ? { display: 'block' } : null}>
          <a
            href="https://exceed-team.com"
            target="_blank"
            className="navbar-brand d-none d-md-block"
            rel="noopener noreferrer"
          >
            <img src={logo} className="site-logo" alt="logo" />
          </a>
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item mx-1">
              <NavLink to="/sign-up" className="nav-link app-link" activeClassName="active-link">
                Sign up
              </NavLink>
            </li>
            <li className="nav-item mx-1">
              <NavLink to="/sign-in" className="nav-link app-link" activeClassName="active-link">
                Sign in
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
