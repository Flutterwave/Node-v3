const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { updateTokenSchema } = require('../schema/auxillary');

async function service(data, _rave) {
  validator(updateTokenSchema, data);
  data.method = 'PUT';
  const { body: response } = await _rave.request(
    `v3/tokens/${data.token}`,
    data,
  );
  logger(`Update card token`, _rave);
  return response;
}

module.exports = service;
