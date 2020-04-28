const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const HttpStatus = require('http-status-codes');
const errorHandler = require('strong-error-handler');
const swaggerUi = require('swagger-ui-express');

/**
 *  Create new application
 *  @returns {import('express').Express}
 */
function createApplication (swaggerDocument) {
  const app = express();

  app.use(compression());

  // Configure express for CORS and request parsing
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // API routes
  app.get('/openapi.json', (req, res, next) => {
    console.log('swaggerDocument:', swaggerDocument);
    return res.status(HttpStatus.OK).json(swaggerDocument);
  });

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.get('/ui', async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    return res.status(HttpStatus.OK).json(swaggerDocument);
  });

  // Fallback route
  app.use('/', (req, res) => {
    return res.sendStatus(HttpStatus.NOT_FOUND);
  });

  // General error handler
  app.use(errorHandler({
    debug: process.env.NODE_ENV === 'development',
    log: true
  }));

  return app;
};

module.exports = createApplication;
