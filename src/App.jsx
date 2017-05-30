import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: "Bob"},
      messages: [{
        id: 1,
        username: "Bob",
        content: "Has anyone seen my marbles?",
      },
      {
        id: 2,
        username: "Anonymous",
        content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
      }
      ]   
    };
  }

  render() {
    return (
      <div className= 'messagecontainer'>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages = {this.state.messages} />
        <ChatBar user={this.state.currentUser.name}/>
      </div>
     );
  }
}
export default App;
