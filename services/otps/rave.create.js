const joi = require('joi');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = joi.object({
  length: joi.number().integer().min(1).required(),
  customer: joi
    .object({
      name: joi.string().required(),
      email: joi.string().email().required(),
      phone: joi.string().required(),
    })
    .required(),
  sender: joi.string().required(),
  send: joi.boolean().required(),
  medium: joi
    .array()
    .items(joi.string().valid('email', 'whatsapp', 'sms'))
    .required(),
  expiry: joi.number().integer().min(1),
});

function service(data, _rave) {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'Create OTP',
    },
  );

  var d = q.defer();
  q.fcall(() => {
    const { error, value } = spec.validate(data);
    var params = value;
    return params;
  })
    .then((params) => {
      return _rave.request('v3/otps', params);
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
