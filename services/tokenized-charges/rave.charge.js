// const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { tokenSchema } = require('../schema/create');

async function service(data, _rave) {
  validator(tokenSchema, data);
  const { body: response } = await _rave.request(`v3/tokenized-charges`, data);
  // logger(`Create tokenized payments`, _rave);
  return response;
}

module.exports = service;
