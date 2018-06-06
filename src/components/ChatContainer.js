import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import PropTypes from 'prop-types';
import Header from './Header';
import Logo from '../static/images/icon.png';

class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.messageContainer = React.createRef();
  }

  state = {
    newMessage: '',
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate(previousProps) {
    if (previousProps.messages.length !== this.props.messages.length) {
      this.scrollToBottom();
    }
  }

  getAuthor = (msg, nextMsg) => {
    if (!nextMsg || nextMsg.author !== msg.author) {
      return (
        <p className="author">
          <Link to={`/users/${msg.user_id}`}>{msg.author}</Link>
        </p>
      );
    }
    return null;
  };

  scrollToBottom = () => {
    const node = this.messageContainer.current;
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  };

  handleInputChange = e => {
    this.setState({ newMessage: e.target.value });
  };

  handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSubmit();
    }
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state.newMessage);
    this.setState({ newMessage: '' });
  };

  handleLogout = () => {
    firebase.auth().signOut();
  };

  render() {
    return (
      <div id="ChatContainer" className="inner-container">
        <Header>
          <button className="red" onClick={this.handleLogout}>
            Logout
          </button>
        </Header>
        {this.props.messagesLoaded ? (
          <div id="message-container" ref={this.messageContainer}>
            {this.props.messages.map((msg, i) => (
              <div
                key={msg.id}
                className={`message ${this.props.user.email === msg.author &&
                  'mine'}`}
              >
                <p>{msg.msg}</p>
                {this.getAuthor(msg, this.props.messages[i + 1])}
              </div>
            ))}
          </div>
        ) : (
          <div id="loading-container">
            <img src={Logo} alt="logo" id="loader" />
          </div>
        )}
        <div id="chat-input">
          <textarea
            placeholder="Add your message..."
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
            value={this.state.newMessage}
          />
          <button onClick={this.handleSubmit}>
            <svg viewBox="0 0 24 24">
              <path fill="#424242" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
}

ChatContainer.propTypes = {
  onSubmit: PropTypes.func,
  user: PropTypes.object,
  messages: PropTypes.object,
  messagesLoaded: PropTypes.bool,
};

export default ChatContainer;
