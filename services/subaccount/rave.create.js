const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { subaccountSchema } = require('../schema/create');

async function service(data, _rave) {
  validator(subaccountSchema, data);
  logger(`Create a subaccount`, _rave);
  const { body: response } = await _rave.request(`v3/subaccounts`, data);
  return response;
}

module.exports = service;
