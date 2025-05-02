"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = exports.CACHE_EXPIRATION = void 0;
const log_1 = require("../log");
const init_1 = require("./init");
exports.CACHE_EXPIRATION = {
    USER_DATA: 60 * 60 * 24, // 24 hours in seconds
};
class CacheService {
    /**
     * Helper function that wraps a promise-returning function with a retry mechanism.
     * If all retries fail, it logs the error and returns null.
     */
    static async withRetry(fn, retries = CacheService.MAX_RETRIES) {
        let attempt = 0;
        while (attempt < retries) {
            try {
                return await fn();
            }
            catch (error) {
                attempt++;
                log_1.log.error(`Attempt ${attempt} failed: ${error}`);
                if (attempt === retries) {
                    log_1.log.error(`Max retries reached. Operation failed. Returning null.`);
                    return null;
                }
                // Wait 50ms before retrying
                await new Promise(resolve => setTimeout(resolve, 50));
            }
        }
        return null;
    }
    // Set a value in cache
    static async set(key, value, expiration) {
        try {
            const data = JSON.stringify(value);
            await init_1.redisClient.set(key, data, 'EX', expiration);
        }
        catch (error) {
            log_1.log.error(`Redis Set Error: ${error}`);
        }
    }
    // Get a value from cache
    static async get(key) {
        try {
            const data = await init_1.redisClient.get(key);
            return data ? JSON.parse(data) : null;
        }
        catch (error) {
            log_1.log.error(`Redis Get Error: ${error}`);
            return null;
        }
    }
    // Update a value in cache atomically using MULTI/EXEC
    static async update(key, newValue, expiration) {
        try {
            const data = JSON.stringify(newValue);
            await this.withRetry(async () => {
                const multi = init_1.redisClient.multi();
                multi.set(key, data, 'EX', expiration);
                await multi.exec();
            });
        }
        catch (error) {
            log_1.log.error(`Redis Update Error: ${error}`);
        }
    }
    // Delete a specific key from cache
    static async del(key) {
        try {
            await this.withRetry(async () => {
                const exists = await init_1.redisClient.exists(key);
                if (exists) {
                    await init_1.redisClient.del(key);
                }
            });
        }
        catch (error) {
            log_1.log.error(`Redis Delete Error: ${error}`);
        }
    }
    // Get all cached keys matching a pattern
    static async getAll(pattern = '*') {
        try {
            const result = await this.withRetry(async () => {
                const keys = await init_1.redisClient.keys(pattern);
                if (!keys.length)
                    return {};
                const values = await init_1.redisClient.mget(keys);
                const res = {};
                keys.forEach((key, i) => {
                    if (values[i]) {
                        res[key] = JSON.parse(values[i]);
                    }
                });
                return res;
            });
            return result || {};
        }
        catch (error) {
            log_1.log.error(`Redis GetAll Error: ${error}`);
            return {};
        }
    }
}
exports.CacheService = CacheService;
CacheService.MAX_RETRIES = 3;
//# sourceMappingURL=index.js.map