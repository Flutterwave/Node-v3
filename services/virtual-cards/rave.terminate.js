const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { fetchSchema } = require('../schema/base');

async function service(data, _rave) {
  validator(fetchSchema, data);
  logger(`Delete a virtual card`, _rave);
  data.method = 'PUT';
  const { body: response } = await _rave.request(
    `/v3/virtual-cards/${data.id}/terminate`,
    data,
  );
  return response;
}

module.exports = service;
