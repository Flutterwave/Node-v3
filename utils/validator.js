const joi = require('joi');
const { validationError } = require('./error');

exports.validator = (schema, data) => {
  const validation = schema.validate(data);
  const { _, error } = validation;

  if (error) {
    const message = error.details.map((x) => x.message);
    throw new validationError(message);
  }
};
