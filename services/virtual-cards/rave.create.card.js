const joi = require('joi');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = joi.object({
  currency: joi.string().uppercase().length(3).valid('USD').required(),
  amount: joi.number().required(),
  debit_currency: joi.string().uppercase().length(3).default('NGN'),
  billing_name: joi.string(),
  billing_address: joi.string(),
  billing_city: joi.string().trim(),
  billing_state: joi.string().trim().length(2),
  billing_postal_code: joi.string().trim(),
  billing_country: joi.string().trim().length(2),
  first_name: joi.string().trim().required(),
  last_name: joi.string().trim().required(),
  date_of_birth: joi.string().trim().length(10).required(),
  email: joi.string().email().required(),
  phone: joi
    .string()
    .max(50)
    .custom((value) => {
      if (value && !/^\+?\d+$/.test(value))
        throw new Error('phone number should be digits');
      return value;
    }),
  title: joi.string().valid('Mr', 'Mrs', 'Miss').required(),
  gender: joi.string().length(1).valid('M', 'F').required(),
  callback_url: joi.string().uri(),
});

function service(data, _rave) {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'Create-card',
    },
  );

  var d = q.defer();
  q.fcall(() => {
    const { error, value } = spec.validate(data);
    var params = value;
    return params;
  })
    .then((params) => {
      return _rave.request('v3/virtual-cards', params);
    })
    .then((resp) => {
      d.resolve(resp.body);
    })
    .catch((err) => {
      d.reject(err);
    });

  return d.promise;
}
service.morxspc = spec;
module.exports = service;
