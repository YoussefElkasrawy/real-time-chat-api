import Joi from 'joi';

const loginSchema = Joi.object({
  username: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
});

const signupSchema = Joi.object({
  username: Joi.string().trim().min(3).required(),
  password: Joi.string().trim().min(8).required(),
});

const updatePasswordSchema = Joi.object({
  oldPassword: Joi.string().trim().required(),
  newPassword: Joi.string().trim().min(8).required(),
  confNewPassword: Joi.string().trim().min(8).required(),
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
