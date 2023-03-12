const { listSchema } = require('../schema/base');
const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
// const enforceRequired = require('../../utils/build');

async function service(data, _rave) {
  validator(listSchema, data);
  logger(`Fetch transfer fees`, _rave);
  data.method = 'GET';
  const { body: response } = await _rave.request(
    `v3/transfers/fee?currency=${data.currency}&amount=${data.amount}`,
    data,
  );
  return response;
}
module.exports = service;
