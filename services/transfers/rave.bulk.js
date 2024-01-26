const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { createBulkTransferSchema } = require('../schema/create');

async function service(data, _rave) {
  validator(createBulkTransferSchema, data);
  const { body: response } = await _rave.request(`v3/bulk-transfers`, data);
  logger(`Initiate bulk ${data.bulk_data.currency} transfers`, _rave);
  return response;
}

module.exports = service;
