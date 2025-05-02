import { log } from '@/log';
import Redis from 'ioredis';

export const redisClient = new Redis({
  host: 'redis',
  port: 6379,
  password: undefined,
  lazyConnect: true, // Prevent auto-connect
  enableOfflineQueue: false, // Prevent unnecessary queuing
  keepAlive: 30000, // Keep connections alive
  maxRetriesPerRequest: 3, // Retry requests 3 times before failing
  retryStrategy: times => Math.min(times * 50, 2000), // Retry with delay
  reconnectOnError: err => {
    log.error(`Redis error: ${err}`);
    return true;
  },
});

redisClient.on('connect', () => log.info('Connected to Redis Cache.'));
redisClient.on('error', err => log.error('Redis Error:', err));

export async function initCacheDB() {
  try {
    await redisClient.connect(); // Manually establish connection
    await redisClient.ping(); // Check if connection is working
    log.info('Redis cache is ready.');
  } catch (error) {
    throw new Error(`Redis cache connection error: ${error}`);
  }
}
