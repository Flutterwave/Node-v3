const joi = require('joi');

const amountQuerySchema = joi.object({
  id: joi.string().required(),
  product_id: joi.string().required(),
});

const createSchema = joi.object({
  country: joi.string().uppercase().length(2).default('NG'),
  amount: joi.number().positive().required(),
  customer: joi.string().required(),
  recurrence: joi.string().required(),
  reference: joi.string().required(),
  type: joi.string(),
});

const bulkCreateSchema = joi.object({
  bulk_reference: joi.string().required(),
  callback_url: joi.string().uri().required(),
  bulk_data: joi
    .array()
    .items(
      joi.object({
        country: joi.string().required(),
        customer: joi.string().required(),
        amount: joi.number().positive().required(),
        recurrence: joi.string().valid('WEEKLY', 'MONTHLY').required(),
        type: joi.string().required(),
        reference: joi.string().required(),
      }),
    )
    .min(1)
    .required(),
});

const createOrderSchema = joi.object({
  id: joi.string().required(),
  product_id: joi.string().required(),
  amount: joi.number().positive().required(),
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

const fetchStatusSchema = joi.object({
  reference: joi.string().trim().max(100).required(),
});

const updateOrderSchema = joi.object({
  amount: joi.number().required(),
  order_id: joi.string().trim().max(100).required(),
  reference: joi.string().trim().max(100).required(),
});

const validateSchema = joi.object({
  code: joi.string().trim().max(100).required(),
  item_code: joi.string().trim().max(100).required(),
  customer: joi.string().trim().max(100).required(),
});

module.exports = {
  amountQuerySchema,
  createSchema,
  bulkCreateSchema,
  createOrderSchema,
  fetchStatusSchema,
  updateOrderSchema,
  validateSchema,
};
