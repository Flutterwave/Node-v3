const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { bulkCreateSchema } = require('../schema/bill');

async function service(data, _rave) {
  validator(bulkCreateSchema, data);
  const { body: response } = await _rave.request(`v3/bulk-bills`, data);
  logger(`Create bulk bill payments`, _rave);
  return response;
}

module.exports = service;
