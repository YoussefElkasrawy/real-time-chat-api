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
exports.emitEvent = exports.initSocket = exports.SocketEvent = void 0;
const config_1 = __importDefault(require("../config"));
const user_1 = __importDefault(require("../database/models/user"));
const token_1 = require("../utils/token");
const crypto_1 = __importStar(require("crypto")); // Import crypto modules for encryption
var SocketEvent;
(function (SocketEvent) {
    SocketEvent["ERROR"] = "error";
    SocketEvent["NEW_MESSAGE"] = "new_message";
    SocketEvent["USER_ONLINE"] = "user_online";
    SocketEvent["USER_OFFLINE"] = "user_offline";
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
        const id = await (0, token_1.verifyToken)(token, config_1.default.ACCESS_TOKEN_KEY).id;
        const user = await user_1.default.findById(id);
        if (!user) {
            socketError(socket, 'You are not authorized to do that.');
            socket.disconnect();
            return;
        }
        const encryptedOnlineMessage = encryptMessage(`${user.username} join chat`); // Encrypt join message
        emitEvent(socket, SocketEvent.USER_ONLINE, encryptedOnlineMessage);
        socket.on('new_message', message => {
            const encryptedMessage = encryptMessage(`${user.username}: ${message}`); // Encrypt new message
            emitEvent(socket, SocketEvent.NEW_MESSAGE, encryptedMessage);
        });
        socket.on('disconnect', () => {
            const encryptedOfflineMessage = encryptMessage(`${user.username} left chat`); // Encrypt leave message
            emitEvent(socket, SocketEvent.USER_OFFLINE, encryptedOfflineMessage);
        });
    });
}
exports.initSocket = initSocket;
function encryptMessage(message) {
    const key = (0, crypto_1.randomBytes)(32); // Generate a random encryption key
    const iv = (0, crypto_1.randomBytes)(16); // Generate a random initialization vector
    const cipher = crypto_1.default.createCipheriv('aes-256-ctr', key, iv); // Create a cipher using AES-256-CTR algorithm
    let encryptedMessage = cipher.update(message, 'utf-8', 'hex'); // Encrypt the message
    encryptedMessage += cipher.final('hex');
    return encryptedMessage;
}
function emitEvent(socket, event, payload) {
    socket.broadcast.emit(event, payload);
}
exports.emitEvent = emitEvent;
//# sourceMappingURL=sockets.js.map