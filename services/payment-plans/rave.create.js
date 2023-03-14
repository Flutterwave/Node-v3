const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { planSchema } = require('../schema/create');

async function service(data, _rave) {
  validator(planSchema, data);
  logger(`Create a payment plan`, _rave);
  const { body: response } = await _rave.request(`v3/payment-plans`, data);
  return response;
}

module.exports = service;
