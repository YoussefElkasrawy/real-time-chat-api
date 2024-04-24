"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitEvent = exports.initSocket = exports.SocketEvent = void 0;
const config_1 = __importDefault(require("../config"));
const user_1 = __importDefault(require("../database/models/user"));
const token_1 = require("../utils/token");
var SocketEvent;
(function (SocketEvent) {
    SocketEvent["ERROR"] = "error";
    SocketEvent["NEW_MESSAGE"] = "new_message";
    SocketEvent["USER_ONLINE"] = "user_online";
    SocketEvent["USER_OFLINE"] = "user_ofline";
})(SocketEvent || (exports.SocketEvent = SocketEvent = {}));
function socketError(socket, error) {
    socket.emit(SocketEvent.ERROR, error);
}
async function initSocket(io) {
    io.on('connection', async (socket) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            socketError(socket, 'Token are not valid.');
            socket.disconnect();
            return;
        }
        const id = await (0, token_1.verifyToken)(token, config_1.default.ACCESS_TOKEN_KEY);
        const user = await user_1.default.findById(id);
        if (!user) {
            socketError(socket, 'You are not authorized to do that.');
            socket.disconnect();
            return;
        }
        emitEvent(socket, SocketEvent.USER_ONLINE, user.username);
        socket.on('new_message', message => {
            emitEvent(socket, SocketEvent.NEW_MESSAGE, message);
        });
        socket.on('disconnect', () => {
            emitEvent(socket, SocketEvent.USER_OFLINE, user.username);
        });
    });
}
exports.initSocket = initSocket;
function emitEvent(socket, event, payload) {
    socket.broadcast.emit(event, payload);
}
exports.emitEvent = emitEvent;
//# sourceMappingURL=sockets.js.map