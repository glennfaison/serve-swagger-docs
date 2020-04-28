const { URL } = require('url');
const http = require('http');
const https = require('https');
const fs = require('fs');
const { promisify } = require('util');

function httpGET (urlString, headers = {}) {
  return new Promise((resolve, reject) => {
    /** @type {import('https')|import('https')} */
    const protocol = new URL(urlString).protocol === 'https' ? https : http;

    /** @type {ClientRequestArgs} */
    const requestArgs = {
      method: 'GET',
      ...new URL(urlString),
      headers: {
        'Content-Type': 'application/vnd.api+json',
        ...headers
      }
    };

    const req = protocol.request(requestArgs, (res) => {
      // If an error is encountered, reject this promise
      res.on('error', e => reject(e));

      const chunkArray = [];

      res.on('data', chunk => chunkArray.push(chunk));
      res.on('end', () => {
        let body = Buffer.concat(chunkArray).toString('utf-8');
        try {
          body = JSON.parse(body);
        } catch (e) {}
        return resolve({ ...res, body });
      });
    });

    // Send the request
    req.end();
  });
}

async function url (urlString) {
  urlString = urlString.replace(/\\+|\/+/g, '/');
  // Fetch the OpenAPI specifications file
  const res = await httpGET(urlString);

  if (typeof (res.body) === 'object') { return res.body; }
  throw new Error(`Could not fetch the OpenAPI specifications from ${urlString}`);
}

async function file (filePath) {
  filePath = filePath.replace(/\\+|\/+/g, '/');
  const fileData = await promisify(fs.readFile)(filePath, { encoding: 'utf-8' });
  try {
    const json = JSON.parse(fileData);
    if (typeof (json) === 'object') { return json; }
  } catch (e) {
    throw new Error(`Could not fetch the OpenAPI specifications from ${filePath}`);
  }
}

async function port (portNumber) {
  try {
    portNumber = Number.parseInt(portNumber, 10);
    if (Number.isNaN(portNumber)) { throw new Error(); }
  } catch (e) { portNumber = 3000; }
  return portNumber;
}

module.exports = {
  url, file, port
};

/** @typedef {import('http').ClientRequestArgs} ClientRequestArgs */
