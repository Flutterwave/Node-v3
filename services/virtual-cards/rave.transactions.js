const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { listSchema } = require('../schema/base');

async function service(data, _rave) {
  validator(listSchema, data);
  logger(`Fetch card transactions`, _rave);
  data.method = 'GET';
  const { body: response } = await _rave.request(
    `v3/virtual-cards/${data.id}/transactions?`,
    data,
  );
  return response;
}

module.exports = service;
