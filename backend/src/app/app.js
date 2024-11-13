require("dotenv").config();
const express = require("express");
const http = require("http");
const applyMiddleware = require("../middleware");
const indexRoute = require("../routes");
const setupSocket = require("../lib/socket"); // Import the socket setup function
const app = express();

// Create an HTTP server to use with Socket.IO
const server = http.createServer(app);

// Setup Socket.IO with the server
const io = setupSocket(server);
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Use middleware
applyMiddleware(app);

// Use router
app.use("/api/v1", indexRoute);

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: 200,
    message: "Welcome to the UniCode API",
  });
});

// Handle global error
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.log(err);
  res.status(err.status || 500).json({
    status: err.status,
    name: err.name,
    message: err.message,
    details: err.details,
  });
});

module.exports = server;
