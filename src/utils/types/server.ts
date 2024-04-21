import { ApiError, HttpStatus } from '@/error';
import { Router } from 'express';
export type InitRouterFunc = (app: Router) => void;

export interface ResponseTemplate<T = unknown> {
  status: 'success' | 'error' | 'fail';
  data?: T;
  error?: {
    code: number;
    message: string;
  };
}

interface WithError {
  error: ApiError;
  result: null;
}

interface WithoutError<T> {
  error: null;
  result: T;
}

export type SafeResult<T> = WithError | WithoutError<T>;
export type AsyncSafeResult<T> = Promise<SafeResult<T>>;


declare global {
  namespace Express {
    export interface Response {
      JSON: (code: HttpStatus, data?: unknown) => void;
    }
  }
}
