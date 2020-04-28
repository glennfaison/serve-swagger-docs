const { describe, it } = require('mocha');
const { expect } = require('chai');

const { port } = require('./parameters');

describe('Parameters test', () => {
  describe('PORT parameter test', () => {
    it('should NOT throw an error if the parameter cannot be converted to an integer', async () => {
      expect(await port('ykho')).to.be.ok;
    });

    it('should convert a floating point number to an integer', async () => {
      expect(await port('8000.7')).to.equal(8000);
    });

    it('should return 3000 for any invalid port', async () => {
      expect(await port('ykho')).to.equal(3000);
    });
  });

  describe('FILE parameter test', () => {
    it('should throw an error if the parameter is an invalid file path', async () => {});

    it('should return a JSON object if the file path is valid', async () => {});

    it('should find a file if the file path uses either escaped backslashes, or slashes', async () => {});
  });

  describe('URL parameter test', () => {
    it('should throw an error a GET request on the url does not return a JSON object', async () => {});

    it('should return a JSON object if the file path is valid', async () => {});
  });
});
