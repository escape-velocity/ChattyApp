import React, { Component } from "react";

export default class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: props.username,
      content: ""
    };
  }

  onContent = e => {
    this.setState({
      content: e.target.value
    });
  };

  onNameChange = e => {
    this.setState({
      username: e.target.value
    });
  };

  handleEnter = e => {
    if (e.key === "Enter") {
      this.props.newMessage(this.state.username, this.state.content);
    }
  };

  onUsernameBlur = e => {
    this.props.newUsername(this.state.username);
  };

  render() {
    const { onContent, onNameChange, onUsernameBlur, handleEnter } = this;
    const { username } = this.state;

    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          value={username}
          onChange={onNameChange}
          onBlur={onUsernameBlur}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onChange={onContent}
          onKeyPress={handleEnter}
        />
      </footer>
    );
  }
}
