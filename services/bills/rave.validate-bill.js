const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { validateSchema } = require('../schema/bill');

async function service(data, _rave) {
  validator(validateSchema, data);
  logger(`Validate bill payment`, _rave);
  data.method = 'GET';
  const { body: response } = await _rave.request(
    `v3/bill-items/${data.item_code}/validate?code=${data.code}&customer=${data.customer}`,
    data,
  );
  return response;
}

module.exports = service;
