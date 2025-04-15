// const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { refundSchema } = require('../schema/create');

async function service(data, _rave) {
  validator(refundSchema, data);
  data.method = 'POST';
  const { body: response } = await _rave.request(
    `v3/transactions/${data.id}/refund`,
    data,
  );
  // logger(`Initiate a refund`, _rave);
  return response;
}

module.exports = service;
