const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { bankChargeSchema } = require('../schema/create');

async function service(data, _rave) {
  validator(bankChargeSchema, data);
  logger(`Create USSD charge`, _rave);
  const { body: response } = await _rave.request(`v3/charges?type=ussd`, data);
  return response;
}

module.exports = service;
