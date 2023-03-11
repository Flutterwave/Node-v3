var joi = require('joi');
var q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = joi.object({
  id: joi.string().required(),
  debit_currency: joi.string().uppercase().length(3).default('NGN').required(),
  amount: joi.number().required(),
});

function service(data, _rave) {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'Fund-card',
    },
  );

  var d = q.defer();

  q.fcall(() => {
    const { error, value } = spec.validate(data);
    var params = value;
    return params;
  })
    .then((params) => {
      var uri = `v3/virtual-cards/${params.id}/fund`;
      return _rave.request(uri, params);
    })
    .then((response) => {
      // console.log(response.body);
      d.resolve(response.body);
    })
    .catch((err) => {
      d.reject(err);
    });

  return d.promise;
}
service.morxspc = spec;
module.exports = service;
