import { ApiError } from '@/error';
import { SafeResult } from '@/utils/types/server';

export function unwrapResult<T>(result: SafeResult<T>): T {
  if (!result.error) {
    return result.result;
  }
  throw new ApiError(result.error.message, result.error.code);
}
