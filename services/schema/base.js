const joi = require('joi');

const listSchema = joi.object({
  id: joi.string(),
  page: joi.string().min(1),
  from: joi.string().isoDate(),
  to: joi.string().isoDate(),
  reference: joi.string(),
  currency: joi.string().uppercase().length(3).default('NGN'),
  amount: joi.number(),
  status: joi.string().max(20),
  interval: joi
    .string()
    .max(20)
    .valid('daily', 'weekly', 'monthly', 'quarterly', 'yearly'),
});

const fetchSchema = joi.object({
  id: joi.string().required(),
});

const updateSchema = joi.object({
  id: joi.string().required(),
});

module.exports = {
  listSchema,
  fetchSchema,
  updateSchema,
};
