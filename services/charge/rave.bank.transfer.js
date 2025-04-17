// const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { chargeSchema } = require('../schema/create');

async function service(data, _rave) {
  validator(chargeSchema, data);
  const { body: response } = await _rave.request(
    `v3/charges?type=bank_transfer`,
    data,
  );
  // logger(`Create Bank transfer charge`, _rave);
  return response;
}

module.exports = service;
