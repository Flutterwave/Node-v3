const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { validateSchema } = require('../schema/base');

async function service(data, _rave) {
  validator(validateSchema, data);
  const { body: response } = await _rave.request(`v3/validate-charge`, data);
  logger(`Validate payment`, _rave);
  return response;
}

module.exports = service;
