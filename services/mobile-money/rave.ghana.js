const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { momoSchema } = require('../schema/create');

async function service(data, _rave) {
  validator(momoSchema, data);
  const { body: response } = await _rave.request(
    `/v3/charges?type=mobile_money_ghana`,
    data,
  );
  logger(`Create ${data.currency} MoMo charge`, _rave);
  return response;
}

module.exports = service;
