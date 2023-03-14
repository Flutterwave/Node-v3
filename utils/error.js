const { errorLog } = require('./logger');

class validationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

const getErrorMessage = (err) => {
  if (err instanceof validationError) {
    return err.message;
  } else {
    errorLog.error(err.message, err);
  }
};

module.exports = { validationError };
