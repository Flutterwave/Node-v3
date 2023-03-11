const joi = require('joi');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = joi.object({
  amount: joi.number().required(),
  currency: joi.string().uppercase().length(3).default('NGN').required(),
  account_bank: joi.when('currency', {
    is: joi.valid('EUR', 'GBP', 'USD', 'KES'),
    then: joi.string().length(3).optional(),
    otherwise: joi.string().length(3).required(),
  }),
  account_number: joi.when('currency', {
    is: joi.valid('EUR', 'GBP', 'USD', 'KES'),
    then: joi.string().trim().max(20).optional(),
    otherwise: joi.string().trim().max(20).required(),
  }),
  narration: joi.string().max(100),
  debit_currency: joi.string().uppercase().length(3).default('NGN'),
  reference: joi.string().trim().max(100),
  beneficiary: joi.number(),
  beneficiary_name: joi.string().max(100),
  destination_branch_code: joi.string().max(10),
  callback_url: joi.string().max(100),
  meta: joi.when('currency', {
    is: 'EUR',
    then: joi.array().items(
      joi
        .object({
          AccountNumber: joi.string().trim().required(),
          RoutingNumber: joi.string().trim().required(),
          SwiftCode: joi.string().required(),
          BankName: joi.string().required(),
          BeneficiaryName: joi.string().required(),
          BeneficiaryCountry: joi.string().uppercase().length(2).required(),
          PostalCode: joi.string().required(),
          StreetNumber: joi.string().required(),
          StreetName: joi.string().required(),
          City: joi.string().required(),
        })
        .required(),
    ),
  }),
  otherwise: joi.when('currency', {
    is: 'GBP',
    then: joi.array().items(
      joi.object({
        AccountNumber: joi.string().trim().required(),
        RoutingNumber: joi.string().trim().required(),
        SwiftCode: joi.string().required(),
        BankName: joi.string().required(),
        BeneficiaryName: joi.string().required(),
        BeneficiaryCountry: joi.string().uppercase().length(2).required(),
        PostalCode: joi.string().required(),
        StreetNumber: joi.string().required(),
        StreetName: joi.string().required(),
        City: joi.string().required(),
      }),
    ),
  }),
  otherwise: joi.when('currency', {
    is: 'USD',
    then: joi.array().items(
      joi.object({
        AccountNumber: joi.string().trim().required(),
        RoutingNumber: joi.string().trim().required(),
        SwiftCode: joi.string().required(),
        BankName: joi.string().required(),
        BeneficiaryName: joi.string().required(),
        BeneficiaryAddress: joi.string().required(),
        BeneficiaryCountry: joi.string().uppercase().length(2).required(),
      }),
    ),
  }),
  otherwise: joi.when('currency', {
    is: 'KES',
    then: joi.array().items(
      joi.object({
        sender: joi.string().required(),
        mobile_number: joi
          .string()
          .max(50)
          .custom((value) => {
            if (value && !/^\+?\d+$/.test(value))
              throw new Error('phone number should be digits');
            return value;
          })
          .required(),
        sender_country: joi.string().uppercase().length(2).required(),
      }),
    ),
  }),
});

function service(data, _rave) {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'Initiate-transfer',
    },
  );

  var d = q.defer();
  q.fcall(() => {
    const { error, value } = spec.validate(data);

    if (error) {
      const message = error.details.map((detail) => detail.message).join(', ');
      return { error: true, message };
    } else {
      var params = value;
      return params;
    }
  })
    .then((params) => {
      //   console.log(params);
      return _rave.request('v3/transfers', params);
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
