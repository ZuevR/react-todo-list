import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar';

const Layout = ({ children, user, checkUser }) => (
  <div>
    <Navbar user={user} checkUser={checkUser} />

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
  user: PropTypes.objectOf(PropTypes.any),
  checkUser: PropTypes.func.isRequired,
};

Layout.defaultProps = {
  user: null,
};
export default Layout;
