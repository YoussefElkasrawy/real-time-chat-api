import { ResponseTemplate } from '@type/server';

export function wrapResponse<T>(data: T,): ResponseTemplate<T> {
  const response: ResponseTemplate<T> = {
    status: 'success',
    data: data,
  };
  return response;
}
