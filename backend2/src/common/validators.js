import Joi from 'joi';
import { mapErrorDetails } from './stringUtils.js';

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
  return mapErrorDetails(error);
}

function validateUpdateUser (user) {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(1).max(20)
      .messages({
        'string.alphanum': 'Username must only contain letters and numbers',
        'string.min': 'Username should have at least {#limit} characters',
        'string.max': 'Username should have at most {#limit} characters',
      }),
    password: Joi.string().min(7).max(64)
      .messages({
        'string.empty': 'Password is not allowed to be empty',
        'string.min': 'Password should have at least {#limit} characters',
        'string.max': 'Password should have at most {#limit} characters',
      }),
    playbackSpeed: Joi.number().min(0.5).max(3)
      .messages({
        'number.min': 'Playback speed should be at least {#limit}',
        'number.max': 'Playback speed should be at most {#limit}',
      }),
    translateLang: Joi.string(),
    transcribeLang: Joi.string(),
  });
  const { error } = schema.validate(user, { abortEarly: false });
  return mapErrorDetails(error);
}

function validateAuthenticated (id) {
  if (!id) return [{ field: ['other'], message: 'Not authorized' }];
  return [];
}

export { validatePutUser, validateUpdateUser, validateAuthenticated };
