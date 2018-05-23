import React from 'react';
import Logo from '../static/images/icon.png';

class Header extends React.Component {
  render() {
    return (
      <div id="Header">
        <img src={Logo} alt="logo" />
        <h1>react pwa</h1>
      </div>
    );
  }
}

export default Header;
