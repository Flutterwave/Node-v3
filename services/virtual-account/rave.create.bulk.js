const joi = require('joi');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = joi.object({
  email: joi.string().max(100).email().required(),
  is_permanent: joi.boolean().required(),
  bvn: joi.string
    .trim()
    .length(11)
    .when('is_permanent', { is: true, then: joi.required() }),
  accounts: joi.string().min(1).required(),
  frequency: joi.string().min(1),
  tx_ref: joi.string().trim().max(100),
  amount: joi.number(),
});

function service(data, _rave) {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'Create-bulk-virtual-account',
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
      return _rave.request('v3/bulk-virtual-account-numbers', params);
    })
    .then((response) => {
      // console.log(response);
      d.resolve(response.body);
    })
    .catch((err) => {
      d.reject(err);
    });

  return d.promise;
}
service.morxspc = spec;
module.exports = service;
