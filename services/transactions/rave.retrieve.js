const joi = require('joi');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = joi.object({
  status: joi.string().valid('failed', 'successfully', 'pending').required(),
  from: joi.string().isoDate(),
  to: joi.string().isoDate(),
  page: joi.string().min(1),
  currency: joi.string().uppercase().length(3),
  email: joi.string().max(100).email(),
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
      message: 'List all transactions',
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
      var uri = `/v3/transactions?`;

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
