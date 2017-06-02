// server.js

const express = require("express");
const SocketServer = require("ws").Server;

const uuidV4 = require("uuid/v4");
// try the environment, default to 3001
const PORT = process.env.PORT || 3001;

// create a new express server
const server = express()
  // make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );

// create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  const packet = JSON.stringify(data);
  wss.clients.forEach(function each(client) {
    client.send(packet);
  });
};

// generating random color for users
function pickColor() {
  var colors = ["#5dd1a1", "#d15db4", "#482cd4", "#fa075d"];
  var random_color = colors[Math.floor(Math.random() * colors.length)];
  return random_color;
}

// broadcast new messages to all users
function handleMessage(message) {
  const data = JSON.parse(message);
  data.id = uuidV4();
  wss.broadcast(data);
}

// update number of online users
function updateOnlineCount(userColor) {
  wss.broadcast({
    type: "onlineUsers",
    content: wss.clients.size,
    userColor: userColor
  });
}

// passes a color on to each new
function handleConnection(client) {
  const userColor = pickColor();
  updateOnlineCount(userColor);

  client.on("message", handleMessage);

  // callback for when a client closes the socket
  client.on("close", () => {
    console.log("Client disconnected");
    updateOnlineCount();
  });
}

wss.on("connection", handleConnection);
