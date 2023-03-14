const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { cardSchema } = require('../schema/create');

async function service(data, _rave) {
  validator(cardSchema, data);
  logger(`Create virtual cards`, _rave);
  const { body: response } = await _rave.request(`v3/virtual-cards`, data);
  return response;
}
module.exports = service;
