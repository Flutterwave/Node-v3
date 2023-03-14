const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { retrieveSchema } = require('../schema/auxillary');

async function service(data, _rave) {
  validator(retrieveSchema, data);
  logger(`Bulk tokenized status`, _rave);
  data.method = 'GET';
  const { body: response } = await _rave.request(
    `v3/bulk-tokenized-charges/${data.bulk_id}`,
    data,
  );
  return response;
}

module.exports = service;
