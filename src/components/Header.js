import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../static/images/icon.png';

const Header = props => (
  <div id="Header">
    <img src={Logo} alt="logo" />
    <h1>react pwa</h1>
    {props.children}
  </div>
);

Header.propTypes = {
  children: PropTypes.any,
};

export default Header;
