import Joi from 'joi';

const loginSchema = Joi.object({
  username: Joi.string().trim().min(1).required(),
  password: Joi.string().trim().min(1).required(),
});

const signupSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string()
    .min(8)
    .regex(/[A-Z]/, 'at least one uppercase letter')
    .regex(/[a-z]/, 'at least one lowercase letter')
    .regex(/[0-9]/, 'at least one number')
    .regex(/[\W_]/, 'at least one special character') // Non-alphanumeric
    .required(),
});

const updatePasswordSchema = Joi.object({
  oldPassword: Joi.string().trim().min(1).required(),
  newPassword: Joi.string()
    .min(8)
    .regex(/[A-Z]/, 'at least one uppercase letter')
    .regex(/[a-z]/, 'at least one lowercase letter')
    .regex(/[0-9]/, 'at least one number')
    .regex(/[\W_]/, 'at least one special character') // Non-alphanumeric
    .required(),
  confNewPassword: Joi.any()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({ 'any.only': 'New password and confirmation must match' }),
});

export const validateLoginDetails = (username: string, password: string) => {
  return loginSchema.validate({ username, password });
};

export const validateSignupDetails = (username: string, password: string) => {
  return signupSchema.validate({ username, password });
};

export const validateUpdatePasswordDetails = (
  oldPassword: string,
  newPassword: string,
  confNewPassword: string,
) => {
  return updatePasswordSchema.validate({ oldPassword, newPassword, confNewPassword });
};
