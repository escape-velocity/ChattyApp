import React, { Component } from 'react';

import Message from './Message.jsx'

export default class MessageList extends Component {
  render() {
    const messages = this.props.messages.map(({ id, username, content }) => (
      <Message
        key={id}
        username={username}
        content={content}
      />
    ));

    return (
      <main className="messages">
        {messages}
      </main>
    );
  }
}