const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { fetchSchema } = require('../schema/base');

async function service(data, _rave) {
  validator(fetchSchema, data);
  data.method = 'GET';
  data.excludeQuery = true;
  const { body: response } = await _rave.request(
    `v3/banks/${data.id}/branches`,
    data,
  );
  logger(`Get bank branches`, _rave);
  return response;
}

module.exports = service;
