const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { fetchAccountSchema } = require('../schema/auxillary');

async function service(data, _rave) {
  validator(fetchAccountSchema, data);
  data.method = 'GET';
  const { body: response } = await _rave.request(
    `v3/bulk-virtual-account-numbers/${data.order_ref}`,
    data,
  );
  logger(`Fetch account details`, _rave);
  return response;
}

module.exports = service;
