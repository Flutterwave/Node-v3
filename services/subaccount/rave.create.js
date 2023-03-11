const joi = require('joi');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = joi.object({
  account_bank: joi.string().length(3).required(),
  account_number: joi.string().trim().max(20).required(),
  business_name: joi.string().trim().max(100).required(),
  split_value: joi.number().min(0).max(1).required(),
  business_mobile: joi.string().required(),
  business_email: joi.string().email(),
  business_contact: joi.string().trim().max(100),
  business_contact_mobile: joi.string().trim().max(100),
  country: joi.string().uppercase().length(2).default('NG'),
  meta: joi.array().items(joi.object({})),
  split_type: joi.string().valid('percentage', 'flat'),
});

function service(data, _rave) {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'Create Subaccount',
    },
  );

  var d = q.defer();
  q.fcall(() => {
    const { error, value } = spec.validate(data);
    var params = value;
    return params;
  })
    .then((params) => {
      return _rave.request('v3/subaccounts', params);
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
