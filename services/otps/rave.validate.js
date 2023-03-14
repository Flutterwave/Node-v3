const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { validateSchema } = require('../schema/auxillary');

async function service(data, _rave) {
  validator(validateSchema, data);
  logger(`Validate OTP`, _rave);
  const { body: response } = await _rave.request(
    `v3/otps/${data.reference}/validate`,
    data,
  );
  return response;
}

module.exports = service;
