import Config from '@/config/env';
import { log } from '@/log';
import mongoose from 'mongoose';

export async function initDB() {
  try {
    await mongoose.connect(Config.MONGODB_URI, {});
    log.info('Connected to DB.');
  } catch (error) {
    throw new Error(`DB Connection Error ${error}`);
  }
}
