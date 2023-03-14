const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { amountQuerySchema } = require('../schema/bill');

async function service(data, _rave) {
  validator(amountQuerySchema, data);
  logger(`Fetch bill amount`, _rave);
  data.method = 'GET';
  const { body: response } = await _rave.request(
    `v3/billers/${data.id}/products/${data.product_id}`,
    data,
  );
  return response;
}

module.exports = service;
