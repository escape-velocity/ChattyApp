import React, {Component} from 'react';

class NavBar extends Component {

  render() {
    return (
        <div>
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <span className="usercount"> {this.props.onlineUsers} user(s) online </span>
            </nav>
           
        </div>
        
    );
  }
}
export default NavBar;
