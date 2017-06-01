// server.js

const express = require("express");
const SocketServer = require("ws").Server;

const uuidV4 = require("uuid/v4");
// Set the port to 3001
const PORT = process.env.PORT || 3001; // Try the environment, default to 3001

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  // console.log('We are at ' + wss.clients.size + ' clients!');
  const packet = JSON.stringify(data);
  wss.clients.forEach(function each(client) {
    client.send(packet);
  });
};

// // Set up a callback that will run when a client connects to the server
// // When a client connects they are assigned a socket, represented by
// // the ws parameter in the callback.
// wss.on('connection', function connection(ws) {

//   //ws.send.JSON.parse();

// });
function pickColor() {
  var colors = ["#5dd1a1", "#d15db4", "#482cd4", "#fa075d"];
  var random_color = colors[Math.floor(Math.random() * colors.length)];
  return random_color;
}

function handleMessage(message) {
  const data = JSON.parse(message);
  data.id = uuidV4();
  wss.broadcast(data);
}

function updateOnlineCount(userColor) {
  wss.broadcast({
    type: "onlineUsers",
    content: wss.clients.size,
    userColor: userColor
  });
}

function handleConnection(client) {
  console.log("New client connected!");
  console.log("We are at " + wss.clients.size + " clients!");
  const userColor = pickColor();
  updateOnlineCount(userColor);

  client.on("message", handleMessage);
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on("close", () => {
    console.log("Client disconnected");
    updateOnlineCount();
  });
  // client.send(sharedContent);
}

wss.on("connection", handleConnection);
