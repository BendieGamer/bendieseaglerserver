const clients = new Map();

function createClient(clientId, ws) {
  const client = {
    id: clientId,
    ws,
    connectedAt: new Date(),
  };
  
  clients.set(clientId, client);
  return client;
}

function removeClient(clientId) {
  clients.delete(clientId);
}

function getClient(clientId) {
  return clients.get(clientId);
}

function broadcastMessage(message, excludeClientId = null) {
  clients.forEach((client, clientId) => {
    if (clientId !== excludeClientId && client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(message);
    }
  });
}

module.exports = {
  createClient,
  removeClient,
  getClient,
  broadcastMessage,
};