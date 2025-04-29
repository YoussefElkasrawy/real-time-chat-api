import UserModel, { UserDB } from '@/database/models/user';
import { CACHE_EXPIRATION, CacheService } from '.';

export async function getCachedUser(userId: string): Promise<UserDB | null> {
  const cached = await CacheService.get<UserDB>(`user:${userId}`);
  if (cached) {
    try {
      return UserModel.hydrate(cached);
    } catch (err) {
      return null;
    }
  }
  return null;
}

export async function cacheUser(user: UserDB): Promise<void> {
  await CacheService.set(`user:${user._id!.toString()}`, user, CACHE_EXPIRATION.USER_DATA);
}

export async function updateCachedUser(userId: string, newUserData: UserDB): Promise<void> {
  await CacheService.update(`user:${userId}`, newUserData, CACHE_EXPIRATION.USER_DATA);
}

export async function removeCachedUser(userId: string): Promise<void> {
  await CacheService.del(`user:${userId}`);
}
