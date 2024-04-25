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
const error_1 = require("./error");
const config_1 = __importDefault(require("./config"));
const sockets_1 = require("./websocket/sockets");
const socket_io_1 = require("socket.io");
const authRoute_1 = __importDefault(require("./routes/authRoute"));
function _404Middleware(app) {
    app.use(() => {
        throw new error_1.ApiError('EndPoint Not Found!', error_1.HttpStatus.NotFound);
    });
}
function errorMiddleware(app) {
    const errorHandler = async (err, _, res, __) => {
        let code = err.code || 500;
        const responseError = {
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
function initMiddleware(app) {
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use((0, compression_1.default)());
    app.use((_, res, next) => {
        res.JSON = (code, data) => {
            res.status(code).json(data);
        };
        next();
    });
}
function createServer() {
    const app = (0, express_1.default)();
    const server = http.createServer(app);
    const io = new socket_io_1.Server(server, { cors: { origin: '*' } });
    app.set('io', io);
    (0, sockets_1.initSocket)(io);
    initMiddleware(app);
    app.use('/api/v1/auth', authRoute_1.default);
    _404Middleware(app);
    errorMiddleware(app);
    server.listen(config_1.default.PORT, () => {
        const address = server.address();
        console.log(`app listen on [${address.address}]:${address.port}`);
    });
    return app;
}
exports.createServer = createServer;
async function main() {
    await (0, init_1.initDB)();
    createServer();
}
main();
//# sourceMappingURL=index.js.map