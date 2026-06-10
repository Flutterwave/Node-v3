const { validator } = require('../../utils/validator');
const { fetchSchema } = require('../schema/base');
const telemetry = require('../../utils/logger');

async function service(data, _rave) {
  validator(fetchSchema, data);
  data.method = 'GET';
  data.excludeQuery = true;

  const { body: response } = await _rave.request(
    `v3/transactions/${data.id}/verify`,
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
