import React, {Component} from 'react';

class ChatBar extends Component {
  constructor() {
    super();

  this.onContent = this.onContent.bind(this);
  }
  
  onContent(event) {
    this.setState({
      content: event.target.value
    });
  }

  handleEnter = (e) => {
      if(e.charCode == 13) {
        this.props.newMessage(this.state.name, this.state.content);
      }
  }

  render() {
    return (
    <footer className="chatbar">
        <input className="chatbar-username" 
          placeholder="Your Name (Optional)" 
          onChange={ this.onContent }
          value={ this.props.user }/>
        <input className="chatbar-message" 
          placeholder="Type a message and hit ENTER" 
          onChange={ this.onContent }
          onKeyPress={ this.handleEnter } />
    </footer>
    );
  }
}

export default ChatBar;


 