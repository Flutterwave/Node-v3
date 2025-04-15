// const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { beneficiarySchema } = require('../schema/create');

async function service(data, _rave) {
  validator(beneficiarySchema, data);
  const { body: response } = await _rave.request(`v3/beneficiaries`, data);
  // logger(`Create beneficiary`, _rave);
  return response;
}

module.exports = service;
