import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './Header';
import Logo from '../static/images/icon.png';

class UserContainer extends React.Component {
  getAuthor = author => {
    if (!this.renderedUserEmail) {
      this.renderedUserEmail = true;
      return <p className="author">{author}</p>;
    }
    return null;
  };

  renderedUserEmail = false;

  render() {
    return (
      <div id="UserContainer" className="inner-container">
        <Header>
          <Link to="/">
            <button className="red">Back To Chat</button>
          </Link>
        </Header>
        {this.props.messagesLoaded ? (
          <div id="message-container">
            {this.props.messages.map(msg => {
              if (msg.user_id === this.props.userID) {
                return (
                  <div key={msg.id} className="message">
                    {this.getAuthor(msg.author)}
                    <p>{msg.msg}</p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        ) : (
          <div id="loading-container">
            <img src={Logo} alt="logo" id="loader" />
          </div>
        )}
      </div>
    );
  }
}

UserContainer.propTypes = {
  messagesLoaded: PropTypes.bool,
  messages: PropTypes.object,
  userID: PropTypes.string,
};

export default UserContainer;
