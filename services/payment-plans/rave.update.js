const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { updatePlanSchema } = require('../schema/auxillary');

async function service(data, _rave) {
  validator(updatePlanSchema, data);
  data.method = 'PUT';
  const { body: response } = await _rave.request(
    `v3/payment-plans/${data.id}`,
    data,
  );
  logger(`Update plan details`, _rave);
  return response;
}

module.exports = service;
