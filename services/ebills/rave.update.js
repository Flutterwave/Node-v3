const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { updateSchema } = require('../schema/auxillary');

async function service(data, _rave) {
  validator(updateSchema, data);
  logger(`Update ebills details`, _rave);
  data.method = 'PUT';
  const { body: response } = await _rave.request(
    `v3/ebills/${data.reference}`,
    data,
  );
  return response;
}

module.exports = service;
