import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.onContent = this.onContent.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this); 
  }

  onContent(e) {
    this.setState({
      content: e.target.value
    });
  }

   onNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }
 
  componentWillMount() {
    this.setState({
        name: this.props.user
    });
  }

  handleEnter = (e) => {
    if(e.charCode == 13) {
      this.props.newMessage(this.state.name, this.state.content);
    }
  }

  onUsernameBlur = (e) => {
    console.log('inside blur func', this.state.name)
    this.props.newUsername(this.state.name);
  }

  render() {
    return (
      <footer className="chatbar">
          <input className="chatbar-username" 
              placeholder="Your Name (Optional)" 
              value={ this.state.name }
              onChange={ this.onNameChange }
              onBlur= {this.onUsernameBlur}
                          />
          <input className="chatbar-message" 
              placeholder="Type a message and hit ENTER" 
              onChange={ this.onContent }
              onKeyPress={ this.handleEnter } />
      </footer>
    );
  }
}



export default ChatBar;


 