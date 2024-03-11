const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { feeSchema } = require('../schema/auxillary');

async function service(data, _rave) {
  validator(feeSchema, data);
  data.method = 'GET';
  data.excludeQuery = true;
  const { body: response } = await _rave.request(
    `v3/transactions/fee?amount=${data.amount}&currency=${data.currency}`,
    data,
  );
  logger(`Create OTP`, _rave);
  return response;
}

module.exports = service;
