const joi = require('joi');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = joi.object({});

function service(data, _rave) {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'List all Subscriptions',
    },
  );

  var d = q.defer();

  q.fcall(() => {
    var params = spec;
    return params;
  })
    .then((params) => {
      params.method = 'GET';
      var uri = `v3/subscriptions`;

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
