const { fetchAccountSchema } = require('../schema/auxillary');

async function service(data, _rave) {
  validator(fetchAccountSchema, data);
  logger(`Fetch account details`, _rave);
  data.method = 'GET';
  const { body: response } = await _rave.request(
    `v3/bulk-virtual-account-numbers/${data.order_ref}`,
    data,
  );
  return response;
}

module.exports = service;
