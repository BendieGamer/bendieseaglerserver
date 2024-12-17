const express = require('express');

function createServer() {
  const app = express();
  
  // Basic health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  // Create HTTP server
  const server = require('http').createServer(app);
  
  return server;
}

module.exports = { createServer };