// const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { eNairaChargeSchema } = require('../schema/create');

async function service(data, _rave) {
  validator(eNairaChargeSchema, data);
  const { body: response } = await _rave.request(
    `v3/charges?type=enaira`,
    data,
  );
  // logger(`Create eNaira charge`, _rave);
  return response;
}

module.exports = service;
