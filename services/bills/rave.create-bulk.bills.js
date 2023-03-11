const joi = require('joi');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = joi.object({
  bulk_reference: joi.string().required(),
  callback_url: joi.string().uri().required(),
  bulk_data: joi
    .array()
    .items(
      joi.object({
        country: joi.string().required(),
        customer: joi.string().required(),
        amount: joi.number().required(),
        recurrence: joi.string().valid('WEEKLY', 'MONTHLY').required(),
        type: joi.string().required(),
        reference: joi.string().required(),
      }),
    )
    .min(1)
    .required(),
});

function service(data, _rave) {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'Create bulk bills',
    },
  );

  var d = q.defer();
  q.fcall(() => {
    const { error, value } = spec.validate(data);
    var params = value;
    return params;
  })
    .then((params) => {
      params.method = 'POST';

      return _rave.request('v3/bulk-bills', params);
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
