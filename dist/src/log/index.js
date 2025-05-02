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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const env_1 = __importStar(require("../config/env"));
const winston_1 = __importDefault(require("winston"));
__exportStar(require("./utils"), exports);
const { combine, timestamp, printf, colorize } = winston_1.default.format;
// Define a custom log format
const customFormat = printf(({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`);
// Define the configuration for Winston logger
let winstonConfig = {};
// Define the console transport for development environment
const consoleTransport = new winston_1.default.transports.Console({
    format: combine(colorize(), // Colorize the output
    timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }), // Add timestamp to the log
    customFormat // Apply custom format
    ),
});
// Define the file transport for info level logs
const infoFileTransport = new winston_1.default.transports.File({
    filename: 'logs/combined.log',
    format: combine(timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }), // Add timestamp to the log
    customFormat // Apply custom format
    ),
});
// Define the file transport for error level logs
const errorFileTransport = new winston_1.default.transports.File({
    filename: 'logs/errors.log',
    level: 'error',
    format: combine(timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }), // Add timestamp to the log
    customFormat // Apply custom format
    ),
});
// Configure the logger based on the environment
if (env_1.default.NODE_ENV === env_1.Env.PRODUCTION) {
    winstonConfig.level = 'info';
    winstonConfig.transports = [infoFileTransport, errorFileTransport];
}
else {
    winstonConfig.level = 'debug';
    winstonConfig.transports = [consoleTransport];
}
// Create and export the logger
exports.log = winston_1.default.createLogger(winstonConfig);
//# sourceMappingURL=index.js.map