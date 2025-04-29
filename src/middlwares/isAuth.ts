import Config from '@/config/env';
import { ApiError } from '@/error';
import { verifyToken } from '@/utils/token';
import { NextFunction, Request, Response } from 'express';

interface CustomRequest extends Request {
  userId?: string;
}

export async function isAuth(req: CustomRequest, _: Response, next: NextFunction) {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      throw ApiError.unauthorized();
    }
    const splitHeader = authHeader.split(' ');
    if (splitHeader.length !== 2 && splitHeader[0] !== 'Bearer') {
      throw ApiError.invalidTokenFormat();
    }
    const userId = verifyToken(splitHeader[1], Config.ACCESS_TOKEN_KEY).id;
    req.userId = userId as string;
    next();
  } catch (error) {
    next(error);
  }
}
