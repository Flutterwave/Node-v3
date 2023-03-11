const joi = require('joi');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = joi.object({
  id: joi.string().required(),
  product_id: joi.string().required(),
  amount: joi.string().required(),
  country: joi.string().required(),
  reference: joi.string().trim().max(100).required(),
  customer: joi
    .object({
      name: joi.string().required(),
      email: joi.string().email().required(),
      phone_number: joi
        .string()
        .max(50)
        .custom((value) => {
          if (value && !/^\+?\d+$/.test(value))
            throw new Error('phone number should be digits');
          return value;
        })
        .required(),
    })
    .required(),
  fields: joi
    .array()
    .items(
      joi.object({
        id: joi.string(),
        quantity: joi.string(),
        value: joi.string(),
      }),
    )
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
      message: 'Create-order-billing-code',
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
      return _rave.request(
        `v3/billers/${params.id}/products/${params.product_id}/orders`,
        params,
      );
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
