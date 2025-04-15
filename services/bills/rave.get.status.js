// const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { fetchStatusSchema } = require('../schema/bill');

async function service(data, _rave) {
  validator(fetchStatusSchema, data);
  data.method = 'GET';
  const { body: response } = await _rave.request(
    `v3/bills/${data.reference}`,
    data,
  );
  // logger(`Fetch bill status`, _rave);
  return response;
}

module.exports = service;
