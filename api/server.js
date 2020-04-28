const http = require('http');
const createApplication = require('./app');

/**
 *  Create a new server
 *  @returns {import('http').Server}
 */
function createServer (swaggerDocument) {
  const app = createApplication(swaggerDocument);
  const server = http.createServer(app);
  return server;
}

module.exports = createServer;
