const joi = require('joi');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = joi.object({
  amount: joi.number().required(),
  name: joi.string().trim().max(150).required(),
  interval: joi
    .string()
    .max(20)
    .valid('daily', 'weekly', 'monthly', 'quarterly', 'yearly')
    .required(),
  duration: joi.string().min(1),
  currency: joi.string().uppercase().length(3),
});

function service(data, _rave) {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'Create Payment plan',
    },
  );

  const d = q.defer();

  q.fcall(() => {
    const { error, value } = spec.validate(data);
    var params = value;
    return params;
  })
    .then((params) => {
      params.method = 'POST';
      var uri = `v3/payment-plans`;

      return _rave.request(uri, params);
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
