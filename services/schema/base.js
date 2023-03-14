const joi = require('joi');

// fetch information with single id. enforce id in payload
const fetchSchema = joi.object({
  id: joi.string().required(),
});

// retrieve information with different query parameter. add enforceRequired to enforce query params and validate the request
const listSchema = joi.object({
  id: joi.string(),
  page: joi.string().min(1),
  from: joi.string().isoDate(),
  to: joi.string().isoDate(),
  reference: joi.string(),
  tx_ref: joi.string().trim().max(100),
  currency: joi.string().uppercase().length(3).default('NGN'),
  country: joi.string().uppercase().length(2).default('NG'),
  amount: joi.number(),
  status: joi.string().max(20),
  interval: joi
    .string()
    .max(20)
    .valid('daily', 'weekly', 'monthly', 'quarterly', 'yearly'),
  account_bank: joi.string().length(3),
  account_number: joi.string().trim().max(20),
  bank_name: joi.string().trim().max(100),
  split_value: joi.number().min(0).max(1),
  business_name: joi.string().trim().max(100),
  business_email: joi.string().email(),
  split_type: joi.string().valid('percentage', 'flat'),
  subscribed_from: joi.string().isoDate(),
  subscribed_to: joi.string().isoDate(),
  plan: joi.string().min(1),
  customer_fullname: joi.string().max(100),
  email: joi.string().max(100).email(),
});

// Create mobile money payments
const momoSchema = joi.object({
  amount: joi.number().required(),
  email: joi.string().max(100).email().required(),
  tx_ref: joi.string().trim().max(100).required(),
  currency: joi.string().uppercase().length(3).required(),
  phone_number: joi
    .string()
    .max(50)
    .custom((value) => {
      if (value && !/^\+?\d+$/.test(value))
        throw new Error('phone number should be digits');
      return value;
    })
    .required(),
  network: joi.when('currency', {
    is: 'GHS',
    then: joi.string().default('MTN').required(),
  }),
  country: joi.when('currency', {
    is: joi.valid('XAF', 'XOF'),
    then: joi.string().uppercase().length(2).default('CM').required(),
  }),
  order_id: joi.when('currency', {
    is: 'RWF',
    then: joi.string().trim().max(100).required(),
  }),
  fullname: joi.string().max(100),
  client_ip: joi
    .string()
    .ip({
      version: ['ipv4', 'ipv6'],
    })
    .default('::127.0.0.1'),
  meta: joi.array().items(joi.object({})),
  device_fingerprint: joi.string().trim().max(200),
  redirect_url: joi.string().uri(),
});

// Set id for update
const updateSchema = joi.object({
  id: joi.string().required(),
});

module.exports = {
  fetchSchema,
  listSchema,
  momoSchema,
  updateSchema,
};
