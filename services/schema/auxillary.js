const joi = require('joi');

// create an OTP
const createOTPSchema = joi.object({
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

// query transaction fees
const feeSchema = joi.object({
  currency: joi.string().uppercase().length(3).default('NGN').required(),
  amount: joi.number().positive().required(),
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

// fetch account details
const fetchAccountSchema = joi.object({
  order_ref: joi.string().trim().max(100).required(),
});

// fetch balance
const fetchBalance = joi.object({
  currency: joi.string().uppercase().length(3).default('NGN').required(),
});

// fetch bulk account details
const fetchBulkAccountSchema = joi.object({
  batch_id: joi.string().trim().max(100).required(),
});

// fund a virtual card
const fundSchema = joi.object({
  id: joi.string().required(),
  debit_currency: joi.string().uppercase().length(3).default('NGN').required(),
  amount: joi.number().required(),
});

// create an ebill order
const orderSchema = joi.object({
  email: joi.string().max(100).email().required(),
  tx_ref: joi.string().trim().max(100).required(),
  ip: joi
    .string()
    .ip({
      version: ['ipv4', 'ipv6'],
    })
    .default('::127.0.0.1'),
  custom_business_name: joi.string().trim().max(100).required(),
  amount: joi.number().positive().required(),
  currency: joi.string().uppercase().length(3).default('NGN'),
  country: joi.string().uppercase().length(2).default('NG'),
  number_of_units: joi.number().required(),
  phone_number: joi
    .string()
    .max(50)
    .custom((value) => {
      if (value && !/^\+?\d+$/.test(value))
        throw new Error('phone number should be digits');
      return value;
    }),
});

// resolve account details
const resolveSchema = joi.object({
  account_bank: joi.string().min(3).max(11).required(),
  account_number: joi.string().required(),
  country: joi.string().uppercase().length(2).default('NG'),
  type: joi.string(),
});

// fetch tokenization data: bulk tokens and transaction list
const retrieveSchema = joi.object({
  bulk_id: joi.string().required(),
});

// update details on ebill orders
const updateSchema = joi.object({
  reference: joi.string().trim().max(100).required(),
  amount: joi.number().positive().required(),
  currency: joi.string().uppercase().length(3).default('NGN'),
});

// update payment plan details
const updatePlanSchema = joi.object({
  id: joi.string().required(),
  name: joi.string().trim().max(150).required(),
  status: joi.string().valid('active', 'cancelled').required()
});

// update card token
const updateTokenSchema = joi.object({
  token: joi.string().required(),
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
  full_name: joi.string().required(),
});

// withdraw funds from a virtual card
const withdrawalSchema = joi.object({
  id: joi.string().required(),
  amount: joi.number().required(),
});

// Validate an OTP
const validateSchema = joi.object({
  reference: joi.string().trim().max(100).required(),
  otp: joi.number().required(),
});

// validate a BVN
const initiateBVNSchema = joi.object({
  bvn: joi.string().length(11).required(),
  firstname: joi.string().max(100).required(),
  lastname: joi.string().max(100).required(),
  redirect_url: joi.string().uri(),
});

const verifyBVNSchema = joi.object({
  reference: joi.string().trim().max(100).required(),
});

module.exports = {
  createOTPSchema,
  feeSchema,
  fetchAccountSchema,
  fetchBalance,
  fetchBulkAccountSchema,
  fundSchema,
  orderSchema,
  resolveSchema,
  retrieveSchema,
  updateSchema,
  updatePlanSchema,
  updateTokenSchema,
  withdrawalSchema,
  validateSchema,
  initiateBVNSchema,
  verifyBVNSchema
};
