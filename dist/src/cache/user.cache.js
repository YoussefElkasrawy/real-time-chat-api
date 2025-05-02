"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCachedUser = exports.updateCachedUser = exports.cacheUser = exports.getCachedUser = void 0;
const user_1 = __importDefault(require("../database/models/user"));
const _1 = require(".");
async function getCachedUser(userId) {
    const cached = await _1.CacheService.get(`user:${userId}`);
    if (cached) {
        try {
            return user_1.default.hydrate(cached);
        }
        catch (err) {
            return null;
        }
    }
    return null;
}
exports.getCachedUser = getCachedUser;
async function cacheUser(user) {
    await _1.CacheService.set(`user:${user._id.toString()}`, user, _1.CACHE_EXPIRATION.USER_DATA);
}
exports.cacheUser = cacheUser;
async function updateCachedUser(userId, newUserData) {
    await _1.CacheService.update(`user:${userId}`, newUserData, _1.CACHE_EXPIRATION.USER_DATA);
}
exports.updateCachedUser = updateCachedUser;
async function removeCachedUser(userId) {
    await _1.CacheService.del(`user:${userId}`);
}
exports.removeCachedUser = removeCachedUser;
//# sourceMappingURL=user.cache.js.map