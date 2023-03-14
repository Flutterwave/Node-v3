const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { walletTransferSchema } = require('../schema/create');

async function service(data, _rave) {
  validator(walletTransferSchema, data);
  const { body: response } = await _rave.request(`v3/transfers`, data);
  logger(`Initiate interwallet transfers`, _rave);
  return response;
}

module.exports = service;
