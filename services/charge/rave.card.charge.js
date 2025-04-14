const encrypt = require('./encryp');
// const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { cardChargeSchema } = require('../schema/create');

async function service(data, _rave) {
  validator(cardChargeSchema, data);

  var encrypted = encrypt(data.enckey, JSON.stringify(data));
  var payload = {};
  payload.public_key = _rave.getPublicKey();
  payload.client = encrypted;

  const { body: response } = await _rave.request(
    `v3/charges?type=card`,
    payload,
  );

  // logger(`Create card charge`, _rave);
  return response;
}
module.exports = service;
