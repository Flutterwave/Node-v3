const joi = require('joi');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

// const spec = morx.spec()
// 	.build('account_bank', 'required:true, eg:044')
// 	.build('account_number', 'required:true,validators:isNumeric, eg:06900021')
// 	.build('country', 'required:false, eg:KE')
// 	.build('type', 'required:false, eg:MOBILEMONEY')
// 	.end();

const spec = joi.object({
  account_bank: joi.string().length(3).required(),
  account_number: joi.string().required(),
  country: joi.string().uppercase().length(2).default('NG'),
  type: joi.string(),
});

function service(data, _rave) {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'Account resolve',
    },
  );

  var d = q.defer();

  q.fcall(() => {
    const { error, value } = spec.validate(data);
    var params = value;
    return params;
  })
    .then((params) => {
      return _rave.request('v3/accounts/resolve', params);
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
