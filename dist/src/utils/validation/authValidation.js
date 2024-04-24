"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdatePasswordDetails = exports.validateSignupDetails = exports.validateLoginDetails = void 0;
const joi_1 = __importDefault(require("joi"));
const loginSchema = joi_1.default.object({
    username: joi_1.default.string().trim().min(1).required(),
    password: joi_1.default.string().trim().min(1).required(),
});
const signupSchema = joi_1.default.object({
    username: joi_1.default.string().min(3).max(30).required(),
    password: joi_1.default.string()
        .min(8)
        .regex(/[A-Z]/, 'at least one uppercase letter')
        .regex(/[a-z]/, 'at least one lowercase letter')
        .regex(/[0-9]/, 'at least one number')
        .regex(/[\W_]/, 'at least one special character') // Non-alphanumeric
        .required(),
});
const updatePasswordSchema = joi_1.default.object({
    oldPassword: joi_1.default.string().trim().min(1).required(),
    newPassword: joi_1.default.string()
        .min(8)
        .regex(/[A-Z]/, 'at least one uppercase letter')
        .regex(/[a-z]/, 'at least one lowercase letter')
        .regex(/[0-9]/, 'at least one number')
        .regex(/[\W_]/, 'at least one special character') // Non-alphanumeric
        .required(),
    confNewPassword: joi_1.default.any()
        .valid(joi_1.default.ref('newPassword'))
        .required()
        .messages({ 'any.only': 'New password and confirmation must match' }),
});
const validateLoginDetails = (username, password) => {
    return loginSchema.validate({ username, password });
};
exports.validateLoginDetails = validateLoginDetails;
const validateSignupDetails = (username, password) => {
    return signupSchema.validate({ username, password });
};
exports.validateSignupDetails = validateSignupDetails;
const validateUpdatePasswordDetails = (oldPassword, newPassword, confNewPassword) => {
    return updatePasswordSchema.validate({ oldPassword, newPassword, confNewPassword });
};
exports.validateUpdatePasswordDetails = validateUpdatePasswordDetails;
//# sourceMappingURL=authValidation.js.map