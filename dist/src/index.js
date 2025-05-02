"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const http = __importStar(require("node:http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("./config/init");
const init_1 = require("./database/init");
const compression_1 = __importDefault(require("compression"));
const env_1 = __importDefault(require("./config/env"));
const sockets_1 = require("./websocket/sockets");
const socket_io_1 = require("socket.io");
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const logger_1 = require("./middlwares/logger");
const error_1 = __importDefault(require("./middlwares/error"));
const _404_1 = __importDefault(require("./middlwares/404"));
const log_1 = require("./log");
const init_2 = require("./cache/init");
function initMiddleware(app) {
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use((0, express_mongo_sanitize_1.default)({ replaceWith: '' }));
    app.use((0, compression_1.default)());
    app.use((_, res, next) => {
        res.JSON = (code, data) => {
            res.status(code).json(data);
        };
        next();
    });
    (0, logger_1.logger)(app);
}
function createServer() {
    const app = (0, express_1.default)();
    const server = http.createServer(app);
    const io = new socket_io_1.Server(server, { cors: { origin: '*' } });
    app.set('io', io);
    (0, sockets_1.initSocket)(io);
    initMiddleware(app);
    app.use('/api/v1/auth', authRoute_1.default);
    (0, _404_1.default)(app);
    (0, error_1.default)(app);
    server
        .listen(env_1.default.PORT, () => {
        log_1.log.info(`Server created and listening on Port: ${env_1.default.PORT}`);
    })
        .on('error', error => {
        log_1.log.error(`Error starting server: ${error}`);
    });
    return app;
}
exports.createServer = createServer;
async function main() {
    await (0, init_1.initDB)();
    await (0, init_2.initCacheDB)();
    createServer();
}
// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    log_1.log.error(err);
});
// Handle unhandled rejections
process.on('unhandledRejection', reason => {
    log_1.log.error(reason);
});
main();
//# sourceMappingURL=index.js.map