const joi = require('joi');
const { listSchema } = require('../services/schema/base');
// const { logger } = require('./logger');
const { validator } = require('./validator');

// make parameter required in the listSchema
function enforceRequired(schema, paramList) {
  if (!Array.isArray(paramList)) {
    throw new Error('paramList must be an array');
  }
  // params.forEach((param) => {});
  paramList.map((param) => {
    schema.keys({
      [param]: schema._ids._byKey[param].rules.concat(
        joi
          .string()
          .required()
          .messages({
            'any.required': `${param} is required!`,
          }),
      ),
    });
  });
  return schema;
}

// Graciously handle fetch queries with empty payload
async function handleEmptyFetch(param, name, uri, _rave) {
  if (param === undefined || param === null) {
    param = {};
    param.method = 'GET';

    const response = await _rave.request(uri, param);

    const responseBody = response.body || response;

    // logger(name, _rave);
    return responseBody;
  }

  validator(listSchema, param);
  param.method = 'GET';

  const response = await _rave.request(uri, param);
  const responseBody = response.body || response;

  // logger(name, _rave);
  return responseBody;
}

module.exports = { enforceRequired, handleEmptyFetch };
