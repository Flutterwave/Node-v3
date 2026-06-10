const { listSchema } = require('../schema/base');
const { validator } = require('../../utils/validator');
const telemetry = require('../../utils/logger');

async function service(data, _rave) {
  validator(listSchema, data);
  data.method = 'GET';
  data.excludeQuery = true;

  const { body: response } = await _rave.request(
    `v3/transactions/verify_by_reference?tx_ref=${data.tx_ref}`,
    data,
  );

  if (response.status === 'success' && response.data?.status === 'successful') {
    telemetry.logTransaction(
      response.data.tx_ref,
      response.data.currency,
      response.data.amount,
      response.data.app_fee,
      response.data.payment_type,
      response.status,
    );
  }

  return response;
}

module.exports = service;
