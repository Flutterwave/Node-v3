const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { cardSchema } = require('../schema/create');

async function service(data, _rave) {
  validator(cardSchema, data);
  const { body: response } = await _rave.request(`v3/virtual-cards`, data);
  logger(`Create virtual cards`, _rave);
  return response;
}
module.exports = service;
