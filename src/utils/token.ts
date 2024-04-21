import { ApiError } from '@/error';
import jwt from 'jsonwebtoken';

export function createToken(payload: any, key: string, exp: string): string {
  return jwt.sign(payload, key, {
    expiresIn: exp,
  });
}

export function verifyToken(token: string, key: string): any {
  try {
    return jwt.verify(token, key, {
      ignoreExpiration: false,
    });
  } catch (err) {
    throw ApiError.invalidToken();
  }
}
