const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { beneficiarySchema } = require('../schema/create');

async function service(data, _rave) {
  validator(beneficiarySchema, data);
  logger(`Create beneficiary`, _rave);
  const { body: response } = await _rave.request(`v3/beneficiaries`, data);
  return response;
}

module.exports = service;
