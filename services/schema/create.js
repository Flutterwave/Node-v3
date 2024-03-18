const joi = require('joi');

// create a virtual account
const accountSchema = joi.object({
  email: joi.string().max(100).email().required(),
  is_permanent: joi.boolean().required(),
  bvn: joi.when('is_permanent', {
    is: true,
    then: joi.string().trim().length(11).required(),
  }),
  duration: joi.string().min(1),
  frequency: joi.string().min(1),
  narration: joi.string().max(100),
  tx_ref: joi.string().trim().max(100),
  amount: joi.number().positive(),
});

// charge bank accounts: base for NG, UK & EU direct account debits
const bankChargeSchema = joi.object({
  amount: joi.number().positive().required(),
  email: joi.string().max(100).email().required(),
  tx_ref: joi.string().trim().max(100).required(),
  currency: joi.string().uppercase().length(3).required(),
  fullname: joi.string().max(100),
  phone_number: joi
    .string()
    .max(50)
    .custom((value) => {
      if (value && !/^\+?\d+$/.test(value))
        throw new Error('phone number should be digits');
      return value;
    }),
  client_ip: joi
    .string()
    .ip({
      version: ['ipv4', 'ipv6'],
    })
    .default('::127.0.0.1'),
  device_fingerprint: joi.string().trim().max(200),
  redirect_url: joi.string().uri(),
  meta: joi.object().pattern(/^[a-zA-Z0-9_]*$/, joi.any()),
  is_token_io: joi
    .number()
    .positive()
    .when('currency', {
      is: joi.string().valid('GBP', 'EUR'),
      then: joi.required(),
      otherwise: joi.optional()
    }),
});

// create a beneficiary
const beneficiarySchema = joi.object({
  account_number: joi.string().required(),
  account_bank: joi.string().required(),
  beneficiary_name: joi.string().required(),
  currency: joi.string().uppercase().length(3),
  bank_name: joi.string(),
});

// create virtual account in bulk
const bulkAccountSchema = joi.object({
  email: joi.string().max(100).email().required(),
  is_permanent: joi.boolean().required(),
  bvn: joi.when('is_permanent', {
    is: true,
    then: joi.string().trim().length(11).required(),
  }),
  accounts: joi.string().min(1).required(),
  frequency: joi.string().min(1),
  tx_ref: joi.string().trim().max(100),
  amount: joi.number().positive(),
});

// create bulk token payment
const bulkTokenDataSchema = joi.object({
  token: joi.string().required(),
  currency: joi.string().uppercase().length(3).default('NGN').required(),
  country: joi.string().uppercase().length(2).default('NG'),
  amount: joi.number().positive().required(),
  email: joi.string().email().required(),
  full_name: joi.string(),
  ip: joi
    .string()
    .ip({
      version: ['ipv4', 'ipv6'],
    })
    .default('::127.0.0.1'),
  tx_ref: joi.string().trim().max(100).required(),
});

const bulkTokenSchema = joi.object({
  title: joi.string(),
  retry_strategy: joi
    .object({
      retry_interval: joi.number().integer().positive().required().messages({
        'any.required': 'Retry interval is required!',
      }),
      retry_amount_variable: joi
        .number()
        .integer()
        .positive()
        .required()
        .messages({
          'any.required': 'Retry amount variable is required!',
        }),
      retry_attempt_variable: joi
        .number()
        .integer()
        .positive()
        .required()
        .messages({
          'any.required': 'Retry attempt variable is required!',
        }),
      last_attempt_variable: joi
        .number()
        .integer()
        .positive()
        .required()
        .messages({
          'any.required': 'Last attempt variable is required!',
        }),
    })
    .required(),
  bulk_data: joi.array().items(bulkTokenDataSchema).required(),
});

// create bulk transfers
const bulkTransferSchema = joi.object({
  title: joi.string(),
  bulk_data: joi
    .array()
    .items(
      joi.object({
        bank_code: joi.string().length(3).required(),
        account_number: joi.string().trim().max(20).required(),
        amount: joi.number().positive().required(),
        currency: joi.string().uppercase().length(3).default('NGN').required(),
        narration: joi.string(),
        reference: joi.string(),
        meta: joi.when('currency', {
          is: 'ZAR',
          then: joi
            .array()
            .items(
              joi.object({
                first_name: joi.string(),
                last_name: joi.string(),
                email: joi.string().email().required(),
                mobile_number: joi
                  .string()
                  .max(50)
                  .custom((value) => {
                    if (value && !/^\+?\d+$/.test(value))
                      throw new Error('phone number should be digits');
                    return value;
                  })
                  .required(),
                recipient_address: joi.string().required(),
                sender: joi.string().required(),
                sender_country: joi
                  .string()
                  .uppercase()
                  .length(2)
                  .default('NG')
                  .required(),
              }),
            )
            .required(),
        }),
      }),
    )
    .required(),
});

// create virtual card
const cardSchema = joi.object({
  currency: joi.string().uppercase().length(3).valid('USD').required(),
  amount: joi.number().required(),
  debit_currency: joi.string().uppercase().length(3).default('NGN'),
  billing_name: joi.string(),
  billing_address: joi.string(),
  billing_city: joi.string().trim(),
  billing_state: joi.string().trim().length(2),
  billing_postal_code: joi.string().trim(),
  billing_country: joi.string().trim().length(2),
  first_name: joi.string().trim().required(),
  last_name: joi.string().trim().required(),
  date_of_birth: joi.string().trim().length(10).required(),
  email: joi.string().email().required(),
  phone: joi
    .string()
    .max(50)
    .custom((value) => {
      if (value && !/^\+?\d+$/.test(value))
        throw new Error('phone number should be digits');
      return value;
    }),
  title: joi.string().uppercase().valid('MR', 'MRS', 'MISS').required(),
  gender: joi.string().length(1).valid('M', 'F').required(),
  callback_url: joi.string().uri(),
});

// collect card payments
const cardChargeSchema = joi.object({
  enckey: joi.string().required(),
  tx_ref: joi.string().trim().max(100).required(),
  amount: joi.number().positive().required(),
  currency: joi.string().uppercase().length(3).default('NGN'),
  card_number: joi.string().creditCard().required(),
  cvv: joi.string().min(3).max(4).required(),
  expiry_month: joi
    .string()
    .length(2)
    .trim()
    .required()
    .custom((value) => {
      if (!Number(value) || Number(value) < 1 || Number(value) > 12)
        throw new Error('Invalid expiry month');
      return value;
    }),
  expiry_year: joi.string().length(2).trim().required(),
  email: joi.string().max(100).email().required(),
  fullname: joi.string().max(100),
  phone_number: joi
    .string()
    .max(50)
    .custom((value) => {
      if (value && !/^\+?\d+$/.test(value))
        throw new Error('phone number should be digits');
      return value;
    }),
  client_ip: joi
    .string()
    .ip({
      version: ['ipv4', 'ipv6'],
    })
    .default('::127.0.0.1'),
  device_fingerprint: joi.string().trim().max(200),
  redirect_url: joi.string().uri(),
  authorization: joi.object({
    mode: joi.string().max(15),
    pin: joi.number().positive().max(9999),
    address: joi.string(),
    city: joi.string(),
    state: joi.string(),
    country: joi.string().uppercase().length(2).default('NG'),
    zipcode: joi.string(),
  }),
  payment_plan: joi.string(),
  meta: joi.object().pattern(/^[a-zA-Z0-9_]*$/, joi.any()),
  subaccounts: joi.array().items(
    joi.object({
      id: joi.string().trim().max(100).required(),
      transaction_split_ratio: joi.number().positive(),
      transaction_charge_type: joi.string().valid('flat', 'percentage', 'flat_subaccount'),
      transaction_charge: joi.number().positive(),
    })
  ).min(1),
});

// initiate collections for different payment methods
const chargeSchema = joi.object({
  amount: joi.number().positive().required(),
  email: joi.string().max(100).email().required(),
  tx_ref: joi.string().trim().max(100).required(),
  currency: joi.string().uppercase().length(3).default('NGN').required(),
  fullname: joi.string().max(100),
  phone_number: joi
    .string()
    .max(50)
    .custom((value) => {
      if (value && !/^\+?\d+$/.test(value))
        throw new Error('phone number should be digits');
      return value;
    }),
  client_ip: joi
    .string()
    .ip({
      version: ['ipv4', 'ipv6'],
    })
    .default('::127.0.0.1'),
  device_fingerprint: joi.string().trim().max(200),
  redirect_url: joi.string().uri(),
  country: joi.string().uppercase().length(2).default('NG'),
  billing_address: joi.string(),
  billing_city: joi.string(),
  billing_state: joi.string(),
  billing_country: joi.string().uppercase().length(2).default('NG'),
  billing_zip: joi.string(),
  meta: joi.object().pattern(/^[a-zA-Z0-9_]*$/, joi.any()),
  expires: joi.number().positive().max(31536000),
  subaccounts: joi.array().items(
    joi.object({
      id: joi.string().trim().max(100).required(),
      transaction_split_ratio: joi.number().positive(),
      transaction_charge_type: joi.string().valid('flat', 'percentage', 'flat_subaccount'),
      transaction_charge: joi.number().positive(),
    })
  ).min(1),
});

// create eNaira charge
const eNairaChargeSchema = joi.object({
  amount: joi.number().positive().required(),
  email: joi.string().max(100).email().required(),
  tx_ref: joi.string().trim().max(100).required(),
  currency: joi.string().uppercase().length(3).default('NGN').required(),
  fullname: joi.string().max(100),
  phone_number: joi
    .string()
    .max(50)
    .custom((value) => {
      if (value && !/^\+?\d+$/.test(value))
        throw new Error('phone number should be digits');
      return value;
    }),
  client_ip: joi
    .string()
    .ip({
      version: ['ipv4', 'ipv6'],
    })
    .default('::127.0.0.1'),
  device_fingerprint: joi.string().trim().max(200),
  redirect_url: joi.string().uri(),
  meta: joi.object().pattern(/^[a-zA-Z0-9_]*$/, joi.any()),
  is_token: joi.number().positive(),
  is_qr: joi.number().positive(),
});



// create mobile money charge
const momoSchema = joi.object({
  amount: joi.number().positive().required(),
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
    then: joi.string().valid('MTN', 'VODAFONE', 'TIGO').required().messages({
      'any.only': 'Only MTN, VODAFONE and TIGO are valid network values.',
    }),
    otherwise: joi.when('currency', {
      is: 'UGX',
      then: joi
        .string()
        .valid('MTN', 'VODAFONE', 'Airtel')
        .required()
        .messages({
          'any.only': 'Only MTN, VODAFONE and Airtel are valid network values.',
        }),
    }),
    otherwise: joi.when('currency', {
      is: 'TZS',
      then: joi.string().valid('Airtel', 'Tigo', 'Halopesa', 'Vodafone').messages({
        'any.only': 'Only Airtel, Tigo, Halopesa and Vodafone are valid network values.'
      })
    })
  }),
  voucher: joi.when('network', {
    is: 'VODAFONE',
    then: joi.number().required(),
    otherwise: joi.optional(),
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
  meta: joi.object().pattern(/^[a-zA-Z0-9_]*$/, joi.any()),
  device_fingerprint: joi.string().trim().max(200),
  redirect_url: joi.string().uri(),
});

// create a payment plan
const planSchema = joi.object({
  amount: joi.number().positive(),
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
const refundSchema = joi.object({
  id: joi.string().required(),
  amount: joi.number().positive().required(),
});

// create a subaccount
const subaccountSchema = joi.object({
  account_bank: joi.string().min(3).max(6).required(),
  account_number: joi.string().trim().max(20).required(),
  business_name: joi.string().trim().max(100).required(),
  split_value: joi.number().min(0).max(1).required(),
  business_mobile: joi.string().required(),
  business_email: joi.string().email(),
  business_contact: joi.string().trim().max(100),
  business_contact_mobile: joi.string().trim().max(100),
  country: joi.string().uppercase().length(2).default('NG'),
  meta: joi.array().items(joi.object().pattern(/^[a-zA-Z0-9_]*$/, joi.any())),
  split_type: joi.string().valid('percentage', 'flat'),
});

// initiate a transfer
const transferSchema = joi.object({
  amount: joi.number().positive().required(),
  currency: joi.string().uppercase().length(3).default('NGN').required(),
  account_bank: joi.when('currency', {
    is: joi.valid('EUR', 'GBP', 'USD', 'KES'),
    then: joi.string().optional(),
    otherwise: joi.string().required(),
  }),
  account_number: joi.when('currency', {
    is: joi.valid('EUR', 'GBP', 'USD', 'KES'),
    then: joi.string().trim().max(20).optional(),
    otherwise: joi.string().trim().max(20).required(),
  }),
  narration: joi.string().max(100),
  debit_subaccount: joi.string().max(100),
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

// to create a modified version of your original transferSchema to include bank_code.
const modifiedTransferSchema = transferSchema.keys({
  bank_code: joi.when('currency', {
    is: joi.valid('EUR', 'GBP', 'USD', 'KES'),
    then: joi.string().optional(),
    otherwise: joi.string().required(),
  }),
});

// create a bulk transfer
const createBulkTransferSchema = joi.object({
  title: joi.string(),
  bulk_data: joi.array().items(
    modifiedTransferSchema.keys({
      account_bank: joi.forbidden(), // Remove account_bank
    }).rename('account_bank', 'bank_code')
  ).required(),
});

// create a tokenized charge
const tokenSchema = joi.object({
  token: joi.string().required(),
  currency: joi.string().uppercase().length(3).default('NGN').required(),
  country: joi.string().uppercase().length(2).default('NG'),
  amount: joi.number().positive().required(),
  email: joi.string().email().required(),
  full_name: joi.string(),
  ip: joi
    .string()
    .ip({
      version: ['ipv4', 'ipv6'],
    })
    .default('::127.0.0.1'),
  narration: joi.string().required(),
  device_fingerprint: joi.string(),
  tx_ref: joi.string().trim().max(100).required(),
  do_3ds: joi.boolean(),
  preauthorize: joi.boolean(),
  redirect_url: joi.string(),
});

// charge bank accounts: base for USSD charge
const ussdChargeSchema = joi.object({
  account_bank: joi.string().min(3).max(6).required(),
  amount: joi.number().positive().required(),
  email: joi.string().max(100).email().required(),
  tx_ref: joi.string().trim().max(100).required(),
  currency: joi.string().uppercase().length(3).default('NGN').required(),
  fullname: joi.string().max(100),
  phone_number: joi
    .string()
    .max(50)
    .custom((value) => {
      if (value && !/^\+?\d+$/.test(value))
        throw new Error('phone number should be digits');
      return value;
    }),
  client_ip: joi
    .string()
    .ip({
      version: ['ipv4', 'ipv6'],
    })
    .default('::127.0.0.1'),
  device_fingerprint: joi.string().trim().max(200),
  redirect_url: joi.string().uri(),
  meta: joi.object().pattern(/^[a-zA-Z0-9_]*$/, joi.any()),
});

// Initiate transfers from one F4B wallet to another
const walletTransferSchema = joi.object({
  amount: joi.number().positive().required(),
  currency: joi.string().uppercase().length(3).default('NGN').required(),
  account_bank: joi.string().default('flutterwave').required(),
  account_number: joi.string().trim().max(20).required(),
  narration: joi.string().max(100).required(),
  debit_subaccount: joi.string().max(200),
  debit_currency: joi.string().uppercase().length(3).default('NGN'),
  reference: joi.string().trim().max(100),
});

module.exports = {
  accountSchema,
  bankChargeSchema,
  beneficiarySchema,
  bulkAccountSchema,
  bulkTokenSchema,
  bulkTransferSchema,
  cardSchema,
  cardChargeSchema,
  chargeSchema,
  createBulkTransferSchema,
  eNairaChargeSchema,
  momoSchema,
  planSchema,
  refundSchema,
  subaccountSchema,
  transferSchema,
  tokenSchema,
  ussdChargeSchema,
  walletTransferSchema,
};
