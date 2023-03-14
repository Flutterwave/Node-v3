const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { createOTPSchema } = require('../schema/auxillary');

async function service(data, _rave) {
  validator(createOTPSchema, data);
  logger(`Create OTP`, _rave);
  const { body: response } = await _rave.request(`v3/otps`, data);
  return response;
}

module.exports = service;
