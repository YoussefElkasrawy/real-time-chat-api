import { ApiError, HttpStatus } from '@/error';
import { Express } from 'express';

function _404Middleware(app: Express) {
  app.use(() => {
    throw new ApiError('EndPoint Not Found!', HttpStatus.NotFound);
  });
}

export default _404Middleware;
