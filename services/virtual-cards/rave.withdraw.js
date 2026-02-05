// const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { withdrawalSchema } = require('../schema/auxillary');

async function service(data, _rave) {
  validator(withdrawalSchema, data);
  const { body: response } = await _rave.request(
    `v3/virtual-cards/${data.id}/withdraw`,
    data,
  );
  // logger(`Virtual card withdrawals`, _rave);
  return response;
}

module.exports = service;
