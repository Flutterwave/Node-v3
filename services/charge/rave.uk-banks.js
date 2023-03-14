const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { bankChargeSchema } = require('../schema/create');

async function service(data, _rave) {
  validator(bankChargeSchema, data);
  logger(`UK direct debit`, _rave);
  const { body: response } = await _rave.request(
    `v3/charges?type=debit_uk_account`,
    data,
  );
  return response;
}

module.exports = service;
