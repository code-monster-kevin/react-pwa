import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import LoginContainer from './LoginContainer';
import ChatContainer from './ChatContainer';
import UserContainer from './UserContainer';

class App extends React.Component {
  constructor(props) {
    super(props);

    const config = {
      apiKey: `${API_KEY}`,
      authDomain: `${AUTH_DOMAIN}`,
      databaseURL: `${DATABASE_URL}`,
      projectId: `${PROJECT_ID}`,
      storageBucket: '',
      messagingSenderId: `${MESSAGING_SENDER_ID}`,
    };
    firebase.initializeApp(config);
  }

  state = { user: null, messages: [], messagesLoaded: false };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.props.history.push('/login');
      }
    });
    firebase
      .database()
      .ref('/messages')
      .on('value', snapshot => {
        this.onMessage(snapshot);
        if (!this.state.messagesLoaded) {
          this.setState({ messagesLoaded: true });
        }
      });
  }

  onMessage = snapshot => {
    const messages = Object.keys(snapshot.val()).map(key => {
      const msg = snapshot.val()[key];
      msg.id = key;
      return msg;
    });
    this.setState({ messages });
  };

  handleSubmitMessage = msg => {
    // Send to database
    const data = {
      msg,
      author: this.state.user.email,
      user_id: this.state.user.uid,
      timestamp: Date.now(),
    };

    firebase
      .database()
      .ref('messages/')
      .push(data);
  };

  render() {
    return (
      <div id="container">
        <Route
          exact
          path="/"
          render={() => (
            <ChatContainer
              messagesLoaded={this.state.messagesLoaded}
              onSubmit={this.handleSubmitMessage}
              user={this.state.user}
              messages={this.state.messages}
            />)}
        />
        <Route path="/login" component={LoginContainer} />
        <Route
          path="/users/:id"
          render={({ match }) => (
            <UserContainer
              messages={this.state.messages}
              messagesLoaded={this.state.messagesLoaded}
              userID={match.params.id}
            />
          )}
        />
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.object,
};

export default withRouter(App);
