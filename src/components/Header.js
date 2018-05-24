import React from 'react';
import firebase from 'firebase/auth';
import Logo from '../static/images/icon.png';

class Header extends React.Component {
  handleLogout = () => {
    firebase.auth().signOut();
  };

  render() {
    return (
      <div id="Header">
        <img src={Logo} alt="logo" />
        <h1>react pwa</h1>
        <button className="btn" onClick={this.handleLogout}>
          Logout
        </button>
      </div>
    );
  }
}

export default Header;
