// const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { accountSchema } = require('../schema/create');

async function service(data, _rave) {
  validator(accountSchema, data);
  const { body: response } = await _rave.request(
    `v3/virtual-account-numbers`,
    data,
  );
  // logger(`Create a virtual account`, _rave);
  return response;
}

module.exports = service;
