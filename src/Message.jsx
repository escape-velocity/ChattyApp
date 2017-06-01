import React, { Component } from "react";

export default function Message({ username, content }) {
  return (
    <div className="message">
      <span className="message-username">{username}</span>
      <span className="message-content">{content}</span>
    </div>
  );
}
