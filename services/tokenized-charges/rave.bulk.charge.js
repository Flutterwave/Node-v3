const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { bulkTokenSchema } = require('../schema/create');

async function service(data, _rave) {
  validator(bulkTokenSchema, data);
  logger(`Create bulk tokenized payments`, _rave);
  const { body: response } = await _rave.request(
    `v3/bulk-tokenized-charges`,
    data,
  );
  return response;
}

module.exports = service;
