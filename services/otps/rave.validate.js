// const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { validateSchema } = require('../schema/auxillary');

async function service(data, _rave) {
  validator(validateSchema, data);
  const { body: response } = await _rave.request(
    `v3/otps/${data.reference}/validate`,
    data,
  );
  // logger(`Validate OTP`, _rave);
  return response;
}

module.exports = service;
