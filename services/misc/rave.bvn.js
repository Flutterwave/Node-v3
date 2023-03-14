const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { validateBVNSchema } = require('../schema/auxillary');

async function service(data, _rave) {
  validator(validateBVNSchema, data);
  logger(`Resolve BVN details`, _rave);
  data.method = 'GET';
  const { body: response } = await _rave.request(
    `v3/kyc/bvns/${data.bvn}`,
    data,
  );
  return response;
}

module.exports = service;
