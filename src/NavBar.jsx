import React from "react";

export default function NavBar({ onlineUsers }) {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <span className="usercount">{onlineUsers} user(s) online </span>
    </nav>
  );
}
