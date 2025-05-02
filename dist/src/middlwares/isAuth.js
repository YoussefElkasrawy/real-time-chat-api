"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const user_cache_1 = require("../cache/user.cache");
const env_1 = __importDefault(require("../config/env"));
const user_1 = __importDefault(require("../database/models/user"));
const error_1 = require("../error");
const token_1 = require("../utils/token");
async function fetchAndCacheUser(userId) {
    const user = (await user_1.default.findById(userId)) || null;
    if (user) {
        await (0, user_cache_1.cacheUser)(user);
    }
    console.log('User not found in cache, fetching from DB:', userId);
    return user;
}
async function isAuth(req, _, next) {
    var _a, _b;
    try {
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            throw error_1.ApiError.invalidTokenFormat();
        }
        const splitHeader = authHeader.split(' ');
        if (splitHeader.length !== 2 && splitHeader[0] !== 'Bearer') {
            throw error_1.ApiError.invalidTokenFormat();
        }
        const userId = (0, token_1.verifyToken)(splitHeader[1], env_1.default.ACCESS_TOKEN_KEY).id;
        req.userId = userId;
        req.user =
            (_b = (_a = (await (0, user_cache_1.getCachedUser)(req.userId))) !== null && _a !== void 0 ? _a : (await fetchAndCacheUser(req.userId))) !== null && _b !== void 0 ? _b : undefined;
        if (!req.user) {
            throw error_1.ApiError.invalidTokenFormat();
        }
        next();
    }
    catch (error) {
        next(error);
    }
}
exports.isAuth = isAuth;
//# sourceMappingURL=isAuth.js.map