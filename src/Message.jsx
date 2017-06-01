import React, { Component } from "react";

export default function Message({ username, content, userColor }) {
  var setColor = { color: userColor };
  return (
    <div className="message">
      <span className="message-username" style={setColor}>
        {username}
      </span>
      <span className="message-content">{content}</span>
    </div>
  );
}
