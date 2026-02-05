// const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { createOTPSchema } = require('../schema/auxillary');

async function service(data, _rave) {
  validator(createOTPSchema, data);
  const { body: response } = await _rave.request(`v3/otps`, data);
  // logger(`Create OTP`, _rave);
  return response;
}

module.exports = service;
