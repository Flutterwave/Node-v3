const joi = require('joi');

// create a virtual account
const accountSchema = joi.object({
  email: joi.string().max(100).email().required(),
  is_permanent: joi.boolean().required(),
  bvn: joi.string
    .trim()
    .length(11)
    .when('is_permanent', { is: true, then: joi.required() }),
  duration: joi.string().min(1),
  frequency: joi.string().min(1),
  narration: joi.string().max(100),
  tx_ref: joi.string().trim().max(100),
  amount: joi.number(),
});

// create a beneficiary
const beneficiarySchema = joi.object({
  account_number: joi.string().required(),
  account_bank: joi.string().required(),
});

// create virtual account in bulk
const bulkAccountSchema = joi.object({
  email: joi.string().max(100).email().required(),
  is_permanent: joi.boolean().required(),
  bvn: joi.string
    .trim()
    .length(11)
    .when('is_permanent', { is: true, then: joi.required() }),
  accounts: joi.string().min(1).required(),
  frequency: joi.string().min(1),
  tx_ref: joi.string().trim().max(100),
  amount: joi.number(),
});

// create a payment plan
const planSchema = joi.object({
  amount: joi.number().required(),
  name: joi.string().trim().max(150).required(),
  interval: joi
    .string()
    .max(20)
    .valid('daily', 'weekly', 'monthly', 'quarterly', 'yearly')
    .required(),
  duration: joi.string().min(1),
  currency: joi.string().uppercase().length(3),
});

// initiate the refunds
const refundSchema = oi.object({
  id: joi.string().required(),
  amount: joi.number().required(),
});

// create a subaccount
const subaccountSchema = joi.object({
  account_bank: joi.string().length(3).required(),
  account_number: joi.string().trim().max(20).required(),
  business_name: joi.string().trim().max(100).required(),
  split_value: joi.number().min(0).max(1).required(),
  business_mobile: joi.string().required(),
  business_email: joi.string().email(),
  business_contact: joi.string().trim().max(100),
  business_contact_mobile: joi.string().trim().max(100),
  country: joi.string().uppercase().length(2).default('NG'),
  meta: joi.array().items(joi.object({})),
  split_type: joi.string().valid('percentage', 'flat'),
});

// initiate a transfer
const transferSchema = joi.object({
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
          AccountNumber: joi.string().trim().required().messages({
            'any.required': 'Account number is required!',
          }),
          RoutingNumber: joi.string().trim().required().messages({
            'any.required': 'Routing number is required!',
          }),
          SwiftCode: joi.string().required().messages({
            'any.required': 'Swift code is required!',
          }),
          BankName: joi.string().required().messages({
            'any.required': 'Destination bank name is required!',
          }),
          BeneficiaryName: joi.string().required().messages({
            'any.required': 'Beneficiary name is required!',
          }),
          BeneficiaryCountry: joi
            .string()
            .uppercase()
            .length(2)
            .required()
            .messages({
              'any.required': 'Beneficiary country is required!',
            }),
          PostalCode: joi.string().required().messages({
            'any.required': 'Postal code is required!',
          }),
          StreetNumber: joi.string().required().messages({
            'any.required': 'Street number is required!',
          }),
          StreetName: joi.string().required().messages({
            'any.required': 'Street name is required!',
          }),
          City: joi.string().required().messages({
            'any.required': 'City is required!',
          }),
        })
        .required(),
    ),
  }),
  otherwise: joi.when('currency', {
    is: 'GBP',
    then: joi.array().items(
      joi.object({
        AccountNumber: joi.string().trim().required().messages({
          'any.required': 'Account number is required!',
        }),
        RoutingNumber: joi.string().trim().required().messages({
          'any.required': 'Routing numver is required!',
        }),
        SwiftCode: joi.string().required().messages({
          'any.required': 'Swift code is required!',
        }),
        BankName: joi.string().required().messages({
          'any.required': 'Destination bank name is required!',
        }),
        BeneficiaryName: joi.string().required().messages({
          'any.required': 'Beneficiary name is required!',
        }),
        BeneficiaryCountry: joi
          .string()
          .uppercase()
          .length(2)
          .required()
          .messages({
            'any.required': 'Beneficiary country is required!',
          }),
        PostalCode: joi.string().required().messages({
          'any.required': 'Postal code is required!',
        }),
        StreetNumber: joi.string().required().messages({
          'any.required': 'Street number is required!',
        }),
        StreetName: joi.string().required().messages({
          'any.required': 'Street name is required!',
        }),
        City: joi.string().required().messages({
          'any.required': 'City is required!',
        }),
      }),
    ),
  }),
  otherwise: joi.when('currency', {
    is: 'USD',
    then: joi.array().items(
      joi.object({
        AccountNumber: joi.string().trim().required().messages({
          'any.required': 'Account number is required!',
        }),
        RoutingNumber: joi.string().trim().required().messages({
          'any.required': 'Routing number is required!',
        }),
        SwiftCode: joi.string().required().messages({
          'any.required': 'Swift code is required!',
        }),
        BankName: joi.string().required().messages({
          'any.required': 'Destination bank name is required!',
        }),
        BeneficiaryName: joi.string().required().messages({
          'any.required': 'Beneficiary name is required!',
        }),
        BeneficiaryAddress: joi.string().required().messages({
          'any.required': 'Beneficiary address is required!',
        }),
        BeneficiaryCountry: joi
          .string()
          .uppercase()
          .length(2)
          .required()
          .messages({
            'any.required': 'Beneficiary country is required!',
          }),
      }),
    ),
  }),
  otherwise: joi.when('currency', {
    is: 'KES',
    then: joi.array().items(
      joi.object({
        sender: joi.string().required().messages({
          'any.required': 'Sender is required!',
        }),
        mobile_number: joi
          .string()
          .max(50)
          .custom((value) => {
            if (value && !/^\+?\d+$/.test(value))
              throw new Error('phone number should be digits');
            return value;
          })
          .required()
          .messages({
            'any.required': 'Sender mobile is required!',
          }),
        sender_country: joi.string().uppercase().length(2).required().messages({
          'any.required': 'Sender country is required!',
        }),
      }),
    ),
  }),
});

module.exports = {
  accountSchema,
  beneficiarySchema,
  bulkAccountSchema,
  planSchema,
  refundSchema,
  subaccountSchema,
  transferSchema,
};
