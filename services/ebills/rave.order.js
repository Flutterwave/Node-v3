const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { orderSchema } = require('../schema/auxillary');

async function service(data, _rave) {
  validator(orderSchema, data);
  logger(`Create an ebill`, _rave);
  const { body: response } = await _rave.request(`v3/ebills`, data);
  return response;
}

module.exports = service;
