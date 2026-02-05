// const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { verifyBVNSchema } = require('../schema/auxillary');

async function service(data, _rave) {
  validator(verifyBVNSchema, data);
  data.method = 'GET';
  data.excludeQuery = true;
  const { body: response } = await _rave.request(
    `v3/bvn/verifications/${data.reference}`,
    data,
  );
  // logger(`Verify BVN consent`, _rave);
  return response;
}

module.exports = service;
