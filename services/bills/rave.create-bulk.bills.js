const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { bulkCreateSchema } = require('../schema/bill');

async function service(data, _rave) {
  validator(bulkCreateSchema, data);
  logger(`Create bulk bill payments`, _rave);
  const { body: response } = await _rave.request(`v3/bulk-bills`, data);
  return response;
}

module.exports = service;
