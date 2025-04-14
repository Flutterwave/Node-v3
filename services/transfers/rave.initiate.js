// const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { transferSchema } = require('../schema/create');

async function service(data, _rave) {
  validator(transferSchema, data);
  const { body: response } = await _rave.request(`v3/transfers`, data);
  // logger(`Initiate ${data.currency} transfers`, _rave);
  return response;
}

module.exports = service;
