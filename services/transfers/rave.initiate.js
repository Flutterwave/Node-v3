const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const initiateSchema = require('../schema/transfers');

async function service(data, _rave) {
  validator(initiateSchema, data);
  logger(`Initiate ${data.currency} transfers`, _rave);
  const { body: response } = await _rave.request(`v3/transfers`, data);
  return response;
}

module.exports = service;
