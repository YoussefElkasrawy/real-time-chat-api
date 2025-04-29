import { cacheUser, getCachedUser } from '@/cache/user.cache';
import Config from '@/config/env';
import UserModel, { UserDB } from '@/database/models/user';
import { ApiError } from '@/error';
import { verifyToken } from '@/utils/token';
import { NextFunction, Request, Response } from 'express';

export interface CustomRequest extends Request {
  userId?: string;
  user?: UserDB;
}

async function fetchAndCacheUser(userId: string): Promise<UserDB | null> {
  const user = (await UserModel.findById(userId)) || null;
  if (user) {
    await cacheUser(user);
  }
  console.log('User not found in cache, fetching from DB:', userId);
  return user;
}

export async function isAuth(req: CustomRequest, _: Response, next: NextFunction) {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      throw ApiError.invalidTokenFormat();
    }

    const splitHeader = authHeader.split(' ');
    if (splitHeader.length !== 2 && splitHeader[0] !== 'Bearer') {
      throw ApiError.invalidTokenFormat();
    }

    const userId = verifyToken(splitHeader[1], Config.ACCESS_TOKEN_KEY).id;

    req.userId = userId as string;
    req.user =
      (await getCachedUser(req.userId)) ?? (await fetchAndCacheUser(req.userId)) ?? undefined;
    if (!req.user) {
      throw ApiError.invalidTokenFormat();
    }

    next();
  } catch (error) {
    next(error);
  }
}
