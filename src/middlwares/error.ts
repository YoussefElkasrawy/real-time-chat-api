import { Express, ErrorRequestHandler } from 'express';
import { ResponseTemplate } from '@type/server';
import { log } from '@/log';
import { ApiError } from '@/error';

function errorMiddleware(app: Express) {
  const errorHandler: ErrorRequestHandler = async (err: ApiError, _, res, __) => {
    let code = err.code || 500;
    const responseError: ResponseTemplate = {
      status: 'error',
      error: {
        code: code,
        message: err.message,
      },
    };
    log.error(err.message);
    res.status(code).json(responseError);
  };
  app.use(errorHandler);
}

export default errorMiddleware;
