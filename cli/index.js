const createServer = require('../api/server');
const validParameters = require('./parameters');

function run ({ swaggerDocument, port = 3000 }) {
  const server = createServer(swaggerDocument);

  server.listen(port);
  console.log(`See the documentation at http://localhost:${port}/docs`);
}

function printHelp () {
  const message = `
  serve-swagger-docs(1)                     Help Manual                    serve-swagger-docs(1)


  PORT
      The port on which the server will listen. Is 3000 by default.
  
  URL
      The path to a local OpenAPI file to be served
  
  FILE
      The url to an online OpenAPI specification file

  EXAMPLE
      serve-swagger-docs --port=4000 --file=/Users/osx/Desktop/api.openapi.json
  `;
  console.log();
  console.log(message);
  console.log();
}

async function init () {
  const params = process.argv.slice(2)
    .map(str => str.replace(/^-*/g, ''))
    .map(str => str.split('='));

  if (params.length === 0) {
    printHelp();
    process.exit(0);
  }

  const config = Object.create(null);
  for (const [arg, val] of params) {
    if (!Object.keys(validParameters).includes(arg)) {
      console.log(`Invalid parameter ${arg}`);
      process.exit(-1);
    }
    config[arg] = await validParameters[arg](val);
  }

  config.swaggerDocument = config.file || config.url;

  run(config);
}

module.exports = init;
