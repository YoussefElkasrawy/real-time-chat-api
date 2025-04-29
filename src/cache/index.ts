import { log } from '@/log';
import { redisClient } from './init';

export const CACHE_EXPIRATION = {
  USER_DATA: 60 * 60 * 24, // 24 hours in seconds
};

export class CacheService {
  private static MAX_RETRIES = 3;

  /**
   * Helper function that wraps a promise-returning function with a retry mechanism.
   * If all retries fail, it logs the error and returns null.
   */
  private static async withRetry<T>(
    fn: () => Promise<T>,
    retries = CacheService.MAX_RETRIES,
  ): Promise<T | null> {
    let attempt = 0;
    while (attempt < retries) {
      try {
        return await fn();
      } catch (error) {
        attempt++;
        log.error(`Attempt ${attempt} failed: ${error}`);
        if (attempt === retries) {
          log.error(`Max retries reached. Operation failed. Returning null.`);
          return null;
        }
        // Wait 50ms before retrying
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }
    return null;
  }

  // Set a value in cache
  public static async set(key: string, value: any, expiration: number): Promise<void> {
    try {
      const data = JSON.stringify(value);
      await redisClient.set(key, data, 'EX', expiration);
    } catch (error) {
      log.error(`Redis Set Error: ${error}`);
    }
  }

  // Get a value from cache
  public static async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redisClient.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      log.error(`Redis Get Error: ${error}`);
      return null;
    }
  }

  // Update a value in cache atomically using MULTI/EXEC
  public static async update<T>(key: string, newValue: T, expiration: number): Promise<void> {
    try {
      const data = JSON.stringify(newValue);
      await this.withRetry(async () => {
        const multi = redisClient.multi();
        multi.set(key, data, 'EX', expiration);
        await multi.exec();
      });
    } catch (error) {
      log.error(`Redis Update Error: ${error}`);
    }
  }

  // Delete a specific key from cache
  public static async del(key: string): Promise<void> {
    try {
      await this.withRetry(async () => {
        const exists = await redisClient.exists(key);
        if (exists) {
          await redisClient.del(key);
        }
      });
    } catch (error) {
      log.error(`Redis Delete Error: ${error}`);
    }
  }

  // Get all cached keys matching a pattern
  public static async getAll<T>(pattern: string = '*'): Promise<{ [key: string]: T }> {
    try {
      const result = await this.withRetry(async () => {
        const keys = await redisClient.keys(pattern);
        if (!keys.length) return {};
        const values = await redisClient.mget(keys);
        const res: { [key: string]: T } = {};
        keys.forEach((key, i) => {
          if (values[i]) {
            res[key] = JSON.parse(values[i] as string);
          }
        });
        return res;
      });
      return result || {};
    } catch (error) {
      log.error(`Redis GetAll Error: ${error}`);
      return {};
    }
  }
}
