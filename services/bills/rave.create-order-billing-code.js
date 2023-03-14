const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { createOrderSchema } = require('../schema/bill');

async function service(data, _rave) {
  validator(createOrderSchema, data);
  logger(`Create order with billing code`, _rave);
  const { body: response } = await _rave.request(
    `v3/billers/${data.id}/products/${data.product_id}/orders`,
    data,
  );
  return response;
}

module.exports = service;
