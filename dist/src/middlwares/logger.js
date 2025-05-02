"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const env_1 = __importStar(require("../config/env"));
const log_1 = require("../log");
function logger(app) {
    app.use((req, res, next) => {
        const end = res.end;
        const path = req.path;
        const method = req.method;
        const msStart = new Date().getTime();
        (0, log_1.logRequest)(method, path, env_1.default.NODE_ENV == env_1.Env.PRODUCTION ? req.ip || 'UNKNOWN_IP' : '[RESTRICTED]', req.get('user-agent') || '');
        res.end = function (...d) {
            (0, log_1.logResponse)(method, path, res.statusCode, new Date().getTime() - msStart);
            res.end = end;
            return res.end(...d);
        };
        next();
    });
}
exports.logger = logger;
//# sourceMappingURL=logger.js.map