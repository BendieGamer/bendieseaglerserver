function handleClientMessage(client, message) {
  try {
    const data = JSON.parse(message);
    
    // Handle different message types
    switch (data.type) {
      case 'chat':
        handleChatMessage(client, data);
        break;
      case 'game':
        handleGameMessage(client, data);
        break;
      default:
        console.warn(`Unknown message type: ${data.type}`);
    }
  } catch (error) {
    console.error('Error handling message:', error);
  }
}

function handleChatMessage(client, data) {
  // Implement chat message handling
  broadcastMessage(JSON.stringify({
    type: 'chat',
    sender: client.id,
    content: data.content
  }), client.id);
}

function handleGameMessage(client, data) {
  // Implement game-specific message handling
  broadcastMessage(JSON.stringify({
    type: 'game',
    sender: client.id,
    data: data.gameData
  }), client.id);
}

module.exports = {
  handleClientMessage
};