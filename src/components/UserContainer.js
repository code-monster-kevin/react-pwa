import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const UserContainer = () => (
  <div id="UserContainer">
    <Header>
      <Link to="/">
        <button className="red">Back To Chat</button>
      </Link>
    </Header>
    <h1>Hello from UserContainer {this.props.match.params.id}</h1>
  </div>
);

export default UserContainer;
