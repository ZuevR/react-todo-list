import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar';
import AuthService from '../../auth';

const Layout = ({ children, authService }) => (
  <div>
    <Navbar authService={authService} />

    <main>
      {children}
    </main>
  </div>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  authService: PropTypes.instanceOf(AuthService).isRequired,
};

export default Layout;
