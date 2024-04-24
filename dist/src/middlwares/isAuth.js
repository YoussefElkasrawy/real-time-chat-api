"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const config_1 = __importDefault(require("../config"));
const error_1 = require("../error");
const token_1 = require("../utils/token");
async function isAuth(req, _, next) {
    try {
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            throw error_1.ApiError.unauthorized();
        }
        const splitHeader = authHeader.split(' ');
        if (splitHeader.length !== 2 && splitHeader[0] !== 'Bearer') {
            throw error_1.ApiError.invalidTokenFormat();
        }
        const userId = (0, token_1.verifyToken)(splitHeader[1], config_1.default.ACCESS_TOKEN_KEY).id;
        req.userId = userId;
        next();
    }
    catch (error) {
        next(error);
    }
}
exports.isAuth = isAuth;
//# sourceMappingURL=isAuth.js.map