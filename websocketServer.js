const WebSocket = require("ws");
const fs = require("fs");
const express = require("express");
const cors = require("cors");

// File to store messages
const messagesFile = "messages.json";

// Load messages from file
const loadMessages = () => {
  if (!fs.existsSync(messagesFile)) return {};
  return JSON.parse(fs.readFileSync(messagesFile, "utf-8"));
};

// Save messages to file
const saveMessages = (messages) => {
  fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
};

// Initialize messages
const messages = loadMessages();

// Create WebSocket server
const wss = new WebSocket.Server({ port: 8080 });
console.log("WebSocket server running on ws://localhost:8080");

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (message) => {
    try {
      const parsedMessage = JSON.parse(message);
      console.log("Received message:", parsedMessage);

      const { chatWith, sender, text } = parsedMessage;

      // Store the message
      if (!messages[chatWith]) messages[chatWith] = [];
      messages[chatWith].push({
        sender,
        text,
        timestamp: new Date().toISOString(),
      });

      saveMessages(messages);

      // Broadcast to all clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(parsedMessage));
        }
      });
    } catch (err) {
      console.error("Error processing message:", err);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
  
  ws.onclose = (event) => {
    console.warn("WebSocket connection closed. Reason:", event.reason);
  };
  
});

// Create HTTP server for REST API
const app = express();
app.use(cors());
app.use(express.json());

// Endpoint to fetch stored messages
app.get("/messages", (req, res) => {
  try {
    res.json(messages || {});
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Internal Server Error");
  }
});


// Start HTTP server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`HTTP server running on http://localhost:${PORT}`);
});
