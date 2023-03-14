const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { feeSchema } = require('../schema/auxillary');

async function service(data, _rave) {
  validator(feeSchema, data);
  logger(`Create OTP`, _rave);
  data.method = 'GET';
  const { body: response } = await _rave.request(
    `v3/transactions/fee?amount=${data.amount}&currency=${data.currency}`,
    data,
  );
  return response;
}

module.exports = service;
