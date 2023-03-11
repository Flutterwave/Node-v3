const joi = require('joi');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = joi.object({
  from: joi.string().isoDate().required(),
  to: joi.string().isoDate().required(),
  page: joi.number(),
  reference: joi.string(),
});

function service(data, _rave) {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'Get-bill-payment',
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
      return _rave.request(
        `v3/bills?from=${params.from}&to=${params.to}`,
        params,
      );
    })
    .then((resp) => {
      d.resolve(resp.body.data);
    })
    .catch((err) => {
      d.reject(err);
    });

  return d.promise;
}
service.morxspc = spec;
module.exports = service;
