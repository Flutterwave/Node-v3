const joi = require('joi');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = joi.object({
  currency: joi.string().uppercase().length(3).default('NGN').required(),
  amount: joi.number().required(),
  payment_type: joi
    .string()
    .max(20)
    .valid(
      'card',
      'debit_ng_account',
      'mobilemoney',
      'bank_transfer',
      'ach_payment',
    ),
  card_first6digits: joi.string().length(6),
});

function service(data, _rave) {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'Get transaction fee by currency',
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
      var uri = `v3/transactions/fee?amount=${params.amount}&currency=${params.currency}`;
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
