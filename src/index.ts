import * as http from 'node:http';
import express from 'express';
import cors from 'cors';
import './config/init';
import { initDB } from './database/init';
import compression from 'compression';
import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from './error';
import Config from './config/env';
import { initSocket } from './websocket/sockets';
import { Server as ServerIo } from 'socket.io';
import authRoute from './routes/authRoute';
import mongosanitize from 'express-mongo-sanitize';
import { logger } from './middlwares/logger';
import errorMiddleware from './middlwares/error';
import _404Middleware from './middlwares/404';
import { log } from './log';
import { initCacheDB } from './cache/init';

function initMiddleware(app: express.Express) {
  app.use(cors());
  app.use(express.json());
  app.use(mongosanitize({ replaceWith: '' }));
  app.use(compression());
  app.get('/health', (_, res) => {
    res.status(200).json({ message: 'Server is healthy' });
  });
  app.use((_: Request, res: Response, next: NextFunction) => {
    res.JSON = (code: HttpStatus, data?: unknown) => {
      res.status(code).json(data);
    };
    next();
  });

  logger(app);
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

  server
    .listen(Config.PORT, () => {
      log.info(`Server created and listening on Port: ${Config.PORT}`);
    })
    .on('error', error => {
      log.error(`Error starting server: ${error}`);
    });

  return app;
}

async function main() {
  await initDB();
  await initCacheDB();
  createServer();
}

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  log.error(err);
});

// Handle unhandled rejections
process.on('unhandledRejection', reason => {
  log.error(reason);
});

main();
