"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.signup = exports.login = void 0;
const user_1 = __importDefault(require("../database/models/user"));
const error_1 = require("../error");
const authValidation_1 = require("../utils/validation/authValidation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = require("../utils/token");
const config_1 = __importDefault(require("../config"));
const response_1 = require("../utils/response");
async function login(req, res, next) {
    try {
        const { username, password } = req.body;
        const validation = (0, authValidation_1.validateLoginDetails)(username, password).error;
        if (validation) {
            throw new error_1.ApiError(validation.message, error_1.HttpStatus.BadRequest);
        }
        const user = await user_1.default.findOne({ username });
        if (!user)
            throw error_1.ApiError.invalidCredentials();
        const isPasswordCorrect = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordCorrect)
            throw error_1.ApiError.invalidCredentials();
        const result = {
            username: username,
            accessToken: (0, token_1.createToken)({ id: user._id }, config_1.default.ACCESS_TOKEN_KEY, config_1.default.ACCESS_TOKEN_EXP),
        };
        res.JSON(error_1.HttpStatus.Ok, (0, response_1.wrapResponse)(result));
    }
    catch (error) {
        next(error);
    }
}
exports.login = login;
async function signup(req, res, next) {
    try {
        const { username, password } = req.body;
        const validation = (0, authValidation_1.validateSignupDetails)(username, password).error;
        if (validation) {
            throw new error_1.ApiError(validation.message, error_1.HttpStatus.BadRequest);
        }
        // Ensure password does not contain username as a substring
        if (password.includes(username))
            throw new error_1.ApiError('Password should not contain username', error_1.HttpStatus.BadRequest);
        const existingUser = await user_1.default.findOne({ username });
        if (existingUser)
            throw error_1.ApiError.duplicate('Username');
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = new user_1.default({
            username,
            password: hashedPassword,
        });
        await newUser.save();
        const result = {
            username: newUser.username,
            accessToken: (0, token_1.createToken)({ id: newUser._id }, config_1.default.ACCESS_TOKEN_KEY, config_1.default.ACCESS_TOKEN_EXP),
        };
        res.JSON(error_1.HttpStatus.Ok, (0, response_1.wrapResponse)(result));
    }
    catch (error) {
        next(error);
    }
}
exports.signup = signup;
async function updatePassword(req, res, next) {
    try {
        const { oldPassword, newPassword, confNewPassword } = req.body;
        const validation = (0, authValidation_1.validateUpdatePasswordDetails)(oldPassword, newPassword, confNewPassword).error;
        if (validation) {
            throw new error_1.ApiError(validation.message, error_1.HttpStatus.BadRequest);
        }
        const user = await user_1.default.findById(req.userId);
        if (!user)
            throw error_1.ApiError.invalidToken();
        const isOldPasswordCorrect = await bcrypt_1.default.compare(oldPassword, user.password);
        if (!isOldPasswordCorrect)
            throw new error_1.ApiError('Old password is incorrect.', error_1.HttpStatus.BadRequest);
        const reuseChecks = await Promise.all(user.oldPasswords.map(async (oldHashedPassword) => {
            return await bcrypt_1.default.compare(newPassword, oldHashedPassword);
        }));
        const isPasswordReused = reuseChecks.some(result => result === true);
        if (isPasswordReused)
            throw new error_1.ApiError('Cannot reuse previous passwords.', error_1.HttpStatus.BadRequest);
        user.oldPasswords.push(user.password);
        const hashedNewPassword = await bcrypt_1.default.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();
        const result = 'Password updated successfully';
        res.JSON(error_1.HttpStatus.Ok, (0, response_1.wrapResponse)(result));
    }
    catch (error) {
        next(error);
    }
}
exports.updatePassword = updatePassword;
//# sourceMappingURL=authController.js.map