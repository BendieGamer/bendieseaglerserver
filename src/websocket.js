const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const config = require('./config');
const { handleClientMessage } = require('./handlers');
const { createClient, removeClient } = require('./clients');

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });
  
  wss.on('connection', (ws) => {
    const clientId = uuidv4();
    const client = createClient(clientId, ws);
    
    console.log(`Client connected: ${clientId}`);
    
    ws.on('message', (message) => {
      handleClientMessage(client, message);
    });
    
    ws.on('close', () => {
      console.log(`Client disconnected: ${clientId}`);
      removeClient(clientId);
    });
    
    ws.on('error', (error) => {
      console.error(`Client error (${clientId}):`, error);
      removeClient(clientId);
    });
    
    // Setup ping-pong for connection health check
    ws.isAlive = true;
    ws.on('pong', () => {
      ws.isAlive = true;
    });
  });
  
  // Ping all clients periodically
  const interval = setInterval(() => {
    wss.clients.forEach((ws) => {
      if (ws.isAlive === false) {
        return ws.terminate();
      }
      
      ws.isAlive = false;
      ws.ping();
    });
  }, config.PING_INTERVAL);
  
  wss.on('close', () => {
    clearInterval(interval);
  });
  
  return wss;
}

module.exports = { setupWebSocket };