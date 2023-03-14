const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { momoSchema } = require('../schema/create');

async function service(data, _rave) {
  validator(momoSchema, data);
  logger(`Create ${data.currency} MoMo charge`, _rave);
  const { body: response } = await _rave.request(
    `v3/charges?type=mobile_money_uganda`,
    data,
  );
  return response;
}

module.exports = service;
