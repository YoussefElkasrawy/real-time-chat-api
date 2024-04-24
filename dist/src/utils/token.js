"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const error_1 = require("../error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createToken(payload, key, exp) {
    return jsonwebtoken_1.default.sign(payload, key, {
        expiresIn: exp,
    });
}
exports.createToken = createToken;
function verifyToken(token, key) {
    try {
        return jsonwebtoken_1.default.verify(token, key, {
            ignoreExpiration: false,
        });
    }
    catch (err) {
        throw error_1.ApiError.invalidToken();
    }
}
exports.verifyToken = verifyToken;
//# sourceMappingURL=token.js.map