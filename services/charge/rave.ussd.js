const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { ussdChargeSchema } = require('../schema/create');

async function service(data, _rave) {
  validator(ussdChargeSchema, data);
  const { body: response } = await _rave.request(`v3/charges?type=ussd`, data);
  logger(`Create USSD charge`, _rave);
  return response;
}

module.exports = service;
