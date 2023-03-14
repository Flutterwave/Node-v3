const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { updateOrderSchema } = require('../schema/bill');

async function service(data, _rave) {
  validator(updateOrderSchema, data);
  logger(`Update bill order`, _rave);
  data.method = 'PUT';
  const { body: response } = await _rave.request(
    `v3/product-orders/${data.reference}`,
    data,
  );
  return response;
}

module.exports = service;
