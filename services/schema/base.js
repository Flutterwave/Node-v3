const joi = require('joi');

// fetch information with single id. enforce id in payload
const fetchSchema = joi.object({
  id: joi.string().required(),
});

// retrieve information with different query parameter. add enforceRequired to enforce query params and validate the request
const listSchema = joi.object({
  id: joi.string(),
  page: joi.string().min(1),
  index: joi.string().min(1),
  size: joi.string().min(1),
  from: joi.string().isoDate(),
  to: joi.string().isoDate(),
  bulk_id: joi.string(),
  reference: joi.string(),
  tx_ref: joi.string().trim().max(100),
  currency: joi.string().uppercase().length(3).default('NGN'),
  country: joi.string().uppercase().length(2).default('NG'),
  amount: joi.number().positive(),
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
  airtime: joi.number().integer().positive().min(0).max(1),
  data_bundle: joi.number().integer().positive().min(0).max(1),
  power: joi.number().integer().positive().min(0).max(1),
  internet: joi.number().integer().positive().min(0).max(1),
  toll: joi.number().integer().positive().min(0).max(1),
  cable: joi.number().integer().positive().min(0).max(1),
});

// Set id for update
const updateSchema = joi.object({
  id: joi.string().required(),
});

// validate collections
const validateSchema = joi.object({
  otp: joi.string().min(5).max(7).required(),
  flw_ref: joi.string().required(),
  type: joi.string().valid('card', 'account'),
});

module.exports = {
  fetchSchema,
  listSchema,
  updateSchema,
  validateSchema,
};
