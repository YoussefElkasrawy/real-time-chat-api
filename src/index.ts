import { AddressInfo } from 'node:net';
import * as http from 'node:http';
import express from 'express';
import cors from 'cors';
import './config/init';
import { initDB } from './database/init';
import compression from 'compression';
import { NextFunction, Request, Response, Express, ErrorRequestHandler } from 'express';
import { ApiError, HttpStatus } from './error';
import { wrapResponse } from './utils/response';
import Config from './config';
import { ResponseTemplate } from '@type/server';
import { initSocket } from './websocket/sockets';
import { Server as ServerIo } from 'socket.io';
import authRoute from './routes/authRoute';
function _404Middleware(app: Express) {
  app.use(() => {
    throw new ApiError('EndPoint Not Found!', HttpStatus.NotFound);
  });
}

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
    res.status(code).json(responseError);
  };
  app.use(errorHandler);
}

function initMiddleware(app: express.Express) {
  app.use(cors());
  app.use(express.json());
  app.use(compression());
  app.use((_: Request, res: Response, next: NextFunction) => {
    res.JSON = (code: HttpStatus, data?: unknown) => {
      res.status(code).json(wrapResponse(data));
    };
    next();
  });
}

export function createServer(): express.Express {
  const app = express();
  const server = http.createServer(app);
  const io = new ServerIo(server, { cors: { origin: '*' } });
  app.set('io', io);

  initSocket(io);
  initMiddleware(app);
  app.use('/api/v1/auth', authRoute);
  _404Middleware(app);
  errorMiddleware(app);
  server.listen(Config.PORT, () => {
    const address = server.address() as AddressInfo;
    console.log(`app listen on [${address.address}]:${address.port}`);
  });
  return app;
}

async function main() {
  await initDB();
  createServer();
}

main();
