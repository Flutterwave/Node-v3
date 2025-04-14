// const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { fetchBulkAccountSchema } = require('../schema/auxillary');

async function service(data, _rave) {
  validator(fetchBulkAccountSchema, data);
  data.method = 'GET';
  data.excludeQuery = true;
  const { body: response } = await _rave.request(
    `v3/bulk-virtual-account-numbers/${data.batch_id}`,
    data,
  );
  // logger(`Fetch bulk account details`, _rave);
  return response;
}

module.exports = service;
