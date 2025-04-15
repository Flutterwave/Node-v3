// const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { fundSchema } = require('../schema/auxillary');

async function service(data, _rave) {
  validator(fundSchema, data);
  const { body: response } = await _rave.request(
    `v3/virtual-cards/${data.id}/fund`,
    data,
  );
  // logger(`Fund a virtual card`, _rave);
  return response;
}

module.exports = service;
