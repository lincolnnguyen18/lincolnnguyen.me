import Joi from 'joi';

function validatePutUser (user) {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(1).max(20).required()
      .messages({
        'string.alphanum': 'Username must only contain letters and numbers',
        'string.empty': 'Username is required',
        'string.min': 'Username should have at least {#limit} characters',
        'string.max': 'Username should have at most {#limit} characters',
      }),
    password: Joi.string().min(7).max(64).required()
      .messages({
        'string.empty': 'Password is required',
        'string.min': 'Password should have at least {#limit} characters',
        'string.max': 'Password should have at most {#limit} characters',
      }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).messages({
      'any.only': 'Passwords do not match',
    }),
  });
  const { error } = schema.validate(user, { abortEarly: false });
  if (error) {
    return error.details.map((detail) => ({
      field: detail.path,
      message: detail.message,
    }));
  } else {
    return [];
  }
}

export { validatePutUser };
