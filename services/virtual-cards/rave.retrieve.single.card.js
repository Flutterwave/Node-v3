// const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { fetchSchema } = require('../schema/base');

async function service(data, _rave) {
  validator(fetchSchema, data);
  data.method = 'GET';
  const { body: response } = await _rave.request(
    `/v3/virtual-cards/${data.id}`,
    data,
  );
  // logger(`Fetch a virtual card`, _rave);
  return response;
}

module.exports = service;
