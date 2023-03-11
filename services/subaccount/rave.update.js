var joi = require('joi');
var q = require('q');
const axios = require('axios');
const package = require('../../package.json');

// var spec = morx
//   .spec()
//   .build('id', 'required:true, eg:RS_C3FCBECF928B4B33B9C3BC74A357A9E5')
//   .build('account_number', 'required:true,validators:isNumeric, eg:06900021')
//   .build('business_name', 'required:true, eg:JK Services')
//   .build('business_email', 'required:true, eg:e.ikedieze@gmail.com')
//   .build('split_type', 'required:false,eg:percentage')
//   .build('split_value', 'required:false,eg:0.5')
//   .end();

const spec = joi.object({
  id: joi.string().required(),
  split_value: joi.number().min(0).max(1).required(),
  account_number: joi.string().trim().max(20),
  business_name: joi.string().trim().max(100),
  business_email: joi.string().email(),
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
      message: 'Update Subaccount details',
    },
  );

  var d = q.defer();

  q.fcall(() => {
    const { error, value } = spec.validate(data);
    var params = value;
    return params;
  })
    .then((params) => {
      params.method = 'PUT';
      var uri = `v3/subaccounts/${params.id}`;
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
