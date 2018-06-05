import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
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

  state = { user: null };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.props.history.push('/login');
      }
    });
  }

  render() {
    return (
      <div id="main" className="px4">
        <Route exact path="/" component={ChatContainer} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/users/:id" component={UserContainer} />
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.object,
};

export default withRouter(App);
