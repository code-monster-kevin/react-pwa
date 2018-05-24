import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import firebase from 'firebase';
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
        console.log('user is null');
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
      <div id="main" className="px4">
        <Header />
        <Route exact path="/" component={ChatContainer} />
        <Route path="/login" component={LoginContainer} />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
