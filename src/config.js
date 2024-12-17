require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  MAX_CONNECTIONS: process.env.MAX_CONNECTIONS || 100,
  PING_INTERVAL: process.env.PING_INTERVAL || 30000, // 30 seconds
  PING_TIMEOUT: process.env.PING_TIMEOUT || 10000, // 10 seconds
};