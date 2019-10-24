import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../site-logo.png';
import './style.css';

export default class Header extends Component {
  some = () => undefined;

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-secondary">
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse">
          <a
            href="https://exceed-team.com"
            target="_blank"
            className="navbar-brand"
            rel="noopener noreferrer"
          >
            <img src={logo} className="site-logo" alt="logo" />
          </a>
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item mx-1">
              <NavLink to="/sign-up" className="nav-link app-link" activeClassName="active-link">Sign up</NavLink>
            </li>
            <li className="nav-item mx-1">
              <NavLink to="/sign-in" className="nav-link app-link" activeClassName="active-link">Sign in</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
