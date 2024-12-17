const { createServer } = require('./server');
const { setupWebSocket } = require('./websocket');
const config = require('./config');

async function main() {
  try {
    const server = createServer();
    setupWebSocket(server);
    
    server.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

main();