import Config from '@/config';
import UserModel from '@/database/models/user';
import { verifyToken } from '@/utils/token';
import { Server, Socket } from 'socket.io';
import AES, { randomBytes } from 'crypto'; // Import crypto modules for encryption

export enum SocketEvent {
  ERROR = 'error',
  NEW_MESSAGE = 'new_message',
  USER_ONLINE = 'user_online',
  USER_OFFLINE = 'user_offline',
}

function socketError(socket: Socket, error: string) {
  socket.emit(SocketEvent.ERROR, error);
}

export async function initSocket(io: Server) {
  io.on('connection', async socket => {
    const token = socket.handshake.auth.token;
    if (!token) {
      socketError(socket, 'Token are not valid.');
      socket.disconnect();
      return;
    }

    const id = await verifyToken(token, Config.ACCESS_TOKEN_KEY).id;
    const user = await UserModel.findById(id);
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

function encryptMessage(message: string): string {
  const key = randomBytes(32); // Generate a random encryption key
  const iv = randomBytes(16); // Generate a random initialization vector
  const cipher = AES.createCipheriv('aes-256-ctr', key, iv); // Create a cipher using AES-256-CTR algorithm
  let encryptedMessage = cipher.update(message, 'utf-8', 'hex'); // Encrypt the message
  encryptedMessage += cipher.final('hex');
  return encryptedMessage;
}

export function emitEvent(socket: any, event: SocketEvent, payload?: unknown) {
  socket.broadcast.emit(event, payload);
}
