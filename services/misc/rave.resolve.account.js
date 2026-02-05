// const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { resolveSchema } = require('../schema/auxillary');

async function service(data, _rave) {
  validator(resolveSchema, data);
  data.method = 'POST';
  const { body: response } = await _rave.request(`v3/accounts/resolve`, data);
  // logger(`Resolve bank account details`, _rave);
  return response;
}

module.exports = service;
