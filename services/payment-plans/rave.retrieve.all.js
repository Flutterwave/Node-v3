const joi = require('joi');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = joi.object({
  status: joi.string().max(20),
  from: joi.string().isoDate(),
  to: joi.string().isoDate(),
  currency: joi.string().uppercase().length(3),
  amount: joi.number().required(),
  interval: joi
    .string()
    .max(20)
    .valid('daily', 'weekly', 'monthly', 'quarterly', 'yearly')
    .required(),
  page: joi.string().min(1),
});

function service(data, _rave) {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'List all Plans',
    },
  );

  var d = q.defer();

  q.fcall(() => {
    const { error, value } = spec.validate(data);
    var params = value;
    return params;
  })
    .then((params) => {
      params.method = 'GET';
      var uri = `v3/payment-plans?`;

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
