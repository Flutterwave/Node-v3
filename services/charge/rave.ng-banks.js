// const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { bankChargeSchema } = require('../schema/create');

async function service(data, _rave) {
  validator(bankChargeSchema, data);
  const { body: response } = await _rave.request(`v3/charges?type=mono`, data);
  // logger(`NG direct debit`, _rave);
  return response;
}

module.exports = service;
