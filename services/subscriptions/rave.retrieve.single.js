const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { listSchema } = require('../schema/base');

async function service(data, _rave) {
  validator(listSchema, data);
  logger(`Fetch a subscription`, _rave);
  data.method = 'GET';
  const { body: response } = await _rave.request(
    `v3/subscriptions?email=${data.email}`,
    data,
  );
  return response;
}
module.exports = service;
