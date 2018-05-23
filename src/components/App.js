import React from 'react';
import Header from './Header';
import LoginContainer from './LoginContainer';
import firebase from 'firebase';

class App extends React.Component {
  constructor(props) {
    super(props);

    var config = {
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
      }
    });
  }

  render() {
    return (
      <div id="main" className="px4">
        <Header />
        <LoginContainer />
      </div>
    );
  }
}

export default App;
