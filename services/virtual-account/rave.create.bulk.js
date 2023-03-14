const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { bulkAccountSchema } = require('../schema/create');

async function service(data, _rave) {
  validator(bulkAccountSchema, data);
  const { body: response } = await _rave.request(
    `v3/bulk-virtual-account-numbers`,
    data,
  );
  logger(`Create bulk accounts`, _rave);
  return response;
}

module.exports = service;
