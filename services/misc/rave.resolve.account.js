const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { resolveSchema } = require('../schema/auxillary');

async function service(data, _rave) {
  validator(resolveSchema, data);
  logger(`Resolve bank account details`, _rave);
  data.method = 'GET';
  const { body: response } = await _rave.request(`v3/accounts/resolve`, data);
  return response;
}

module.exports = service;
