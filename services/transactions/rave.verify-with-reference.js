const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { fetchWithReferenceSchema } = require('../schema/base');

async function service(data, _rave) {
  validator(fetchWithReferenceSchema, data);
  data.method = 'GET';
  data.excludeQuery = false;
  const { body: response } = await _rave.request(
    `v3/transactions/verify_by_reference?tx_ref=${data.tx_ref}`,
    data,
  );
  logger(`Verify Transaction With Refrence`, _rave);
  return response;
}

module.exports = service;
