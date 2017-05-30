import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
        <div className="message">
            <span className="message-username"> {this.props.user} </span>
            <span className="message-content"> {this.props.content}</span>
        </div>
    );
  }
}
export default Message;


/*
            <div className="message system">
                Anonymous1 changed their name to nomnom.
            </div>
*/