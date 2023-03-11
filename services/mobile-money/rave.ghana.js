const joi = require('joi');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = joi.object({
  currency: joi.string().uppercase().length(3).valid('GHS').required(),
  network: joi.string().default('MTN').required(),
  amount: joi.number().required(),
  phone_number: joi
    .string()
    .max(50)
    .custom((value) => {
      if (value && !/^\+?\d+$/.test(value))
        throw new Error('phone number should be digits');
      return value;
    })
    .required(),
  email: joi.string().max(100).email().required(),
  fullname: joi.string().max(100),
  client_ip: joi
    .string()
    .ip({
      version: ['ipv4', 'ipv6'],
    })
    .default('::127.0.0.1'),
  tx_ref: joi.string().trim().max(100).required(),
  meta: joi.array().items(joi.object({})),
  device_fingerprint: joi.string().trim().max(200),
  redirect_url: joi.string().uri(),
});

function service(data, _rave) {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'Initiate Ghana Mobile Money charge',
    },
  );

  var d = q.defer();

  q.fcall(() => {
    const { error, value } = spec.validate(data);
    var params = value;
    return params;
  })
    .then((params) => {
      // params.public_key = _rave.getPublicKey();

      return _rave.request('/v3/charges?type=mobile_money_ghana', params);
    })
    .then((response) => {
      d.resolve(response.body);
    })
    .catch((err) => {
      d.reject(err);
    });

  return d.promise;
}
service.morxspc = spec;
module.exports = service;
