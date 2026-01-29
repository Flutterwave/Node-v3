const { expect } = require('chai');
const { validationError, getErrorMessage } = require('../utils/error');

describe('Utils Error Handler Coverage', function () {

  it('should return the message if error is instance of validationError', function () {
    const msg = 'Validation failed';
    const err = new validationError(msg);

    const result = getErrorMessage(err);
    expect(result).to.equal(msg);
  });

  it('should log the error if it is NOT a validationError', function () {
    const msg = 'Generic system crash';
    const err = new Error(msg); // Standard JS Error

    // This executes the "else" block in error.js and calls the error logger.
    const result = getErrorMessage(err);
    expect(result).to.be.undefined;
  });
});