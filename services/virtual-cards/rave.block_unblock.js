const joi = require('joi');
// const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');

const spec = joi.object({
  id: joi.string().required(),
  status_action: joi.string().valid('block', 'unblock').required(),
});

async function service(data, _rave) {
  validator(spec, data);
  data.method = 'PUT';
  const { body: response } = await _rave.request(
    `v3/virtual-cards/${data.id}/status/${data.status_action}`,
    data,
  );
  // logger(`Fund a virtual card`, _rave);
  return response;
}
module.exports = service;
