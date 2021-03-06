import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
import Header from './Header';

class LoginContainer extends React.Component {
  state = {
    email: '',
    password: '',
  };

  onLogin() {
    this.props.history.push('/');
  }

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.email && this.state.password) {
      this.login();
    } else {
      this.setState({ error: 'Please fill in both fields.' });
    }
  };

  login() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.onLogin();
      })
      .catch(err => {
        if (err.code === 'auth/user-not-found') {
          this.signup();
        } else {
          this.setState({ error: 'Error logging in.' });
        }
      });
  }

  signup() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.onLogin();
      })
      .catch(() => {
        this.setState({ error: 'Error signing up.' });
      });
  }

  render() {
    return (
      <div id="LoginContainer" className="inner-container">
        <Header />
        <form onSubmit={this.handleSubmit}>
          <p>Sign in or sign up by entering your email and password.</p>
          <p className="error">{this.state.error}</p>
          <input
            type="text"
            placeholder="Your email"
            onChange={this.handleEmailChange}
            value={this.state.email}
          />
          <input
            type="password"
            placeholder="Your password"
            onChange={this.handlePasswordChange}
            value={this.state.password}
          />
          <button className="red light" type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }
}

LoginContainer.propTypes = {
  history: PropTypes.object,
};

export default LoginContainer;
