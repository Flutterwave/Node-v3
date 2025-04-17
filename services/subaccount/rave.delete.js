// const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { fetchSchema } = require('../schema/base');

async function service(data, _rave) {
  validator(fetchSchema, data);
  data.method = 'DELETE';
  const { body: response } = await _rave.request(
    `/v3/subaccounts/${data.id}`,
    data,
  );
  // logger(`Delete a subaccount`, _rave);
  return response;
}

module.exports = service;
