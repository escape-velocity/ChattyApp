import React, { Component } from "react";

import ChatBar from "./ChatBar.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
import NavBar from "./NavBar.jsx";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Anonymous" },
      messages: [], // messages coming from the server will be stored here as they arrive
      onlineUsers: 0,
      userColor: "black"
    };

    this.addNewMessage = this.addNewMessage.bind(this);
    this.newUsername = this.newUsername.bind(this);
  }

  addNewMessage(name, content) {
    console.log("this is the name", name);
    const message = {
      type: "incomingMessage",
      username: name,
      content,
      userColor: this.state.userColor
    };
    this.socket.send(JSON.stringify(message));
  }

  newUsername(username) {
    let prevName = this.state.currentUser.name;
    this.setState({ currentUser: { name: username } });

    const notification = {
      type: "incomingNotification",
      content: `${prevName} changed their name to ${username}`
    };

    this.socket.send(JSON.stringify(notification));
    console.log("notification", notification);
  }

  componentDidMount() {
    const protocol = location.protocol === "https:" ? "wss" : "ws";
    this.socket = new WebSocket(
      `${protocol}://${location.hostname}:${parseInt(location.port) + 1}`
    ); //Construct our WebSocket address dynamically.

    this.socket.onopen = event => {
      console.log("connected to Server");
    };

    this.socket.onmessage = event => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case "incomingMessage":
        case "incomingNotification":
          return this.setState({
            messages: this.state.messages.concat(message)
          });
        case "onlineUsers":
          return this.setState({
            onlineUsers: message.content,
            userColor: message.userColor
          });
        default:
          // throw new Error("Unknown event type " + message.type);
          console.error(`Unknown message type ${message.type}`);
      }
    };

    this.socket.onerror = error => {
      console.error("Some error happened", error);
    };
  }

  render() {
    return (
      <div className="messagecontainer">
        <NavBar onlineUsers={this.state.onlineUsers} />
        <MessageList messages={this.state.messages} />
        <ChatBar
          username={this.state.currentUser.name}
          newUsername={this.newUsername}
          newMessage={this.addNewMessage}
        />
      </div>
    );
  }
}
