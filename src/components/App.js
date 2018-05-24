import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import firebase from 'firebase/auth';
import Header from './Header';
import LoginContainer from './LoginContainer';
import ChatContainer from './ChatContainer';

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
        console.log(`firebase user: ${user}`);
        this.setState({ user });
      } else {
        this.props.history.push('/login');
      }
    });
  }

  render() {
    return (
        <div id="main" className="px4">
          <Header />
          <Route exact path="/" component={ChatContainer} />
          <Route path="/login" component={LoginContainer} />
        </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.object,
};

export default withRouter(App);
