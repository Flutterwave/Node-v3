// const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { fetchSchema } = require('../schema/base');

async function service(data, _rave) {
  validator(fetchSchema, data);
  data.method = 'PUT';
  const { body: response } = await _rave.request(
    `v3/subscriptions/${data.id}/activate`,
    data,
  );
  // logger(`Activate a subscription`, _rave);
  return response;
}

module.exports = service;
