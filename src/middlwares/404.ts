import { ApiError, HttpStatus } from '@/error';
import { log } from '@/log';
import { Express } from 'express';

function _404Middleware(app: Express) {
  app.use(() => {
    log.error('EndPoint Not Found!');
    throw new ApiError('EndPoint Not Found!', HttpStatus.NotFound);
  });
}

export default _404Middleware;
