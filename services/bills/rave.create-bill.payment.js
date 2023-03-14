const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { createSchema } = require('../schema/bill');

async function service(data, _rave) {
  validator(createSchema, data);
  logger(`Create bill payments`, _rave);
  const { body: response } = await _rave.request(`v3/bills`, data);
  return response;
}

module.exports = service;
