const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { initiateBVNSchema } = require('../schema/auxillary');

async function service(data, _rave) {
  validator(initiateBVNSchema, data);
  const { body: response } = await _rave.request(
    `v3/bvn/verifications`,
    data,
  );
  logger(`Initiate BVN consent`, _rave);
  return response;
}

module.exports = service;
