"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCacheDB = exports.redisClient = void 0;
const log_1 = require("../log");
const ioredis_1 = __importDefault(require("ioredis"));
exports.redisClient = new ioredis_1.default({
    host: 'redis',
    port: 6379,
    password: undefined,
    lazyConnect: true, // Prevent auto-connect
    enableOfflineQueue: false, // Prevent unnecessary queuing
    keepAlive: 30000, // Keep connections alive
    maxRetriesPerRequest: 3, // Retry requests 3 times before failing
    retryStrategy: times => Math.min(times * 50, 2000), // Retry with delay
    reconnectOnError: err => {
        log_1.log.error(`Redis error: ${err}`);
        return true;
    },
});
exports.redisClient.on('connect', () => log_1.log.info('Connected to Redis Cache.'));
exports.redisClient.on('error', err => log_1.log.error('Redis Error:', err));
async function initCacheDB() {
    try {
        await exports.redisClient.connect(); // Manually establish connection
        await exports.redisClient.ping(); // Check if connection is working
        log_1.log.info('Redis cache is ready.');
    }
    catch (error) {
        throw new Error(`Redis cache connection error: ${error}`);
    }
}
exports.initCacheDB = initCacheDB;
//# sourceMappingURL=init.js.map