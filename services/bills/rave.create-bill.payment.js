// const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { createSchema } = require('../schema/bill');

async function service(data, _rave) {
  validator(createSchema, data);
  const { body: response } = await _rave.request(`v3/bills`, data);
  // logger(`Create bill payments`, _rave);
  return response;
}

module.exports = service;
