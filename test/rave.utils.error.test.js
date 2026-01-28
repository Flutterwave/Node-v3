const { expect } = require('chai');
const { validationError, getErrorMessage } = require('../utils/error');

describe('Utils Error Handler Coverage', function () {

  it('should correctly instantiate a validationError', function () {
    const msg = 'Test validation error';
    const err = new validationError(msg);

    expect(err).to.be.an.instanceOf(Error);
    expect(err.name).to.equal('validationError');
    expect(err.message).to.equal(msg);
    expect(err.stack).to.not.be.undefined; // Covers captureStackTrace
  });

  it('should return the message if error is instance of validationError', function () {
    const msg = 'Validation failed';
    const err = new validationError(msg);

    const result = getErrorMessage(err);
    expect(result).to.equal(msg); // Hits the "if" block
  });

  it('should log the error if it is NOT a validationError', function () {
    const msg = 'Generic system crash';
    const err = new Error(msg); // Standard JS Error

    // This hits the "else" block and calls errorLog.error
    const result = getErrorMessage(err);
    expect(result).to.be.undefined;
  });
});