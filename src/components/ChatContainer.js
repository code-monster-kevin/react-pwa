import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import Header from './Header';

class ChatContainer extends React.Component {
  handleLogout = () => {
    firebase.auth().signOut();
  };

  render() {
    return (
      <div id="ChatContainer">
        <Header>
          <button className="btn" onClick={this.handleLogout}>
            Logout
          </button>
        </Header>
        <h1 className="h1">Chat Container</h1>
      </div>
    );
  }
}

export default ChatContainer;
