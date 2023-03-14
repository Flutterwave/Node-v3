const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { listSchema } = require('../schema/base');

async function service(data, _rave) {
  validator(listSchema, data);
  logger(`Fetch bill payments`, _rave);
  data.method = 'GET';
  const { body: response } = await _rave.request(
    `v3/bills?from=${data.from}&to=${data.to}`,
    data,
  );
  return response;
}

module.exports = service;
