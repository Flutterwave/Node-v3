const { listSchema } = require('../schema/base');
// const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');

async function service(data, _rave) {
  validator(listSchema, data);
  data.method = 'GET';
  data.excludeQuery = true;
  const { body: response } = await _rave.request(
    `v3/transactions/verify_by_reference?tx_ref=${data.tx_ref}`,
    data,
  );
  // logger(`Verify Transactions by tx_ref`, _rave);
  return response;
}
module.exports = service;
