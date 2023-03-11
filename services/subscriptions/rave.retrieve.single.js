const joi = require('joi');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = joi.object({
  email: joi.string().max(100).email().required(),
  status: joi.string().max(20),
  subscribed_from: joi.string().isoDate(),
  subscribed_to: joi.string().isoDate(),
  plan: joi.string().min(1),
  customer_fullname: joi.string().max(100),
  tx_ref: joi.string().trim().max(100),
});

function service(data, _rave) {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'Fetch a Subscription',
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
      var uri = `v3/subscriptions?email=${params.email}`;

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
