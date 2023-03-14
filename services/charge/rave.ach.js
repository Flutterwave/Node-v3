const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { chargeSchema } = require('../schema/create');

async function service(data, _rave) {
  validator(chargeSchema, data);
  logger(`Create ACH charge`, _rave);
  const { body: response } = await _rave.request(
    `v3/charges?type=ach_payment`,
    data,
  );
  return response;
}

module.exports = service;
