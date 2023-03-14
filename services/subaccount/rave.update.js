const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { listSchema } = require('../schema/base');

async function service(data, _rave) {
  validator(listSchema, data);
  logger(`update subaccount details`, _rave);
  data.method = 'PUT';
  const { body: response } = await _rave.request(
    `/v3/subaccounts/${data.id}`,
    data,
  );
  return response;
}

module.exports = service;
