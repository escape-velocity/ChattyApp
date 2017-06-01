import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

const uuidV4 = require('uuid/v4');


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [], // messages coming from the server will be stored here as they arrive
      onlineUsers: 0
    };

    this.addNewMessage = this.addNewMessage.bind(this);
    this.newUsername = this.newUsername.bind(this);
  }
       
  addNewMessage(name, content) {
    console.log("this is the name", name);
    const message = {
      type: "incomingMessage",
      id: uuidV4(),
      username: name,
      content,
    }; 
    this.socket.send(JSON.stringify(message));
  }

  newUsername(username) {
    let prevName = this.state.currentUser.name;
    this.setState({currentUser:{name: username}})

   // this.socket.send(JSON.stringify(message));
    
    const notification =  {
      type: "incomingNotification",
      content: `${prevName} changed their name to ${username}`
    };

    this.socket.send(JSON.stringify(notification));
    console.log("notification", notification);
  } 
  

  componentDidMount() {
    this.socket = new WebSocket("ws://127.0.0.1:3001");

    this.socket.onopen = (event) => {
      console.log("connected to Server")
    };

    this.socket.onmessage = (event)  => {
      const message = JSON.parse(event.data);
      switch(message.type) {
      case "incomingMessage":
        return (this.setState({messages: this.state.messages.concat(message)}));  
      case "incomingNotification":
        return (this.setState({messages: this.state.messages.concat(message)}));
      case "onlineUsers":
        this.setState({ onlineUsers: message.content });
        return;
      default: 
        throw new Error("Unknown event type " + message.type);
      }
    };
  };

  render() {
    return (
      <div className= 'messagecontainer'>
        <NavBar onlineUsers = {this.state.onlineUsers} />
        <MessageList messages = {this.state.messages} />
        <ChatBar user={ this.state.currentUser.name } 
           newUsername={ this.newUsername }
           newMessage={ this.addNewMessage }/>
      </div>
     );
  }
}

export default App;


