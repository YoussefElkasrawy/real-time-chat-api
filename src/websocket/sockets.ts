import Config from '@/config';
import UserModel from '@/database/models/user';
import { verifyToken } from '@/utils/token';
import { Server, Socket } from 'socket.io';

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

    emitEvent(socket, SocketEvent.USER_ONLINE, `${user.username} join chat`);

    socket.on('new_message', message => {
      emitEvent(socket, SocketEvent.NEW_MESSAGE, message);
    });

    socket.on('disconnect', () => {
      emitEvent(socket, SocketEvent.USER_OFFLINE, `${user.username} left chat`);
    });
  });
}

export function emitEvent(socket: any, event: SocketEvent, payload?: unknown) {
  socket.broadcast.emit(event, payload);
}
