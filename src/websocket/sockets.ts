import { Server, Socket } from 'socket.io';

export enum SocketEvent {
  ERROR = 'error',
  NEW_MESSAGE = 'new_message',
}

// user , [SID]
const users = new Map<string, string[]>();

function userExists(user: string): boolean {
  return users.has(user);
}
/*
function addUser(user: string, ID: string): void {
  if (userExists(user)) {
    users.get(user)!.push(ID);
  } else {
    users.set(user, [ID]);
  }
}*/

function getUserIds(user: string): string[] | undefined {
  return users.get(user);
}

/*
function removeUser(user: string, ID: string): void {
  if (userExists(user)) {
    const IDs = users.get(user)!;
    const index = IDs.indexOf(ID);
    if (index !== -1) {
      IDs.splice(index, 1);
      if (IDs.length === 0) {
        users.delete(user);
      } else {
        users.set(user, IDs);
      }
    }
  }
}
*/

export function inWebSocket(id: string) {
  return userExists(id);
}

function socketError(socket: Socket, error: string) {
  socket.emit(SocketEvent.ERROR, error);
}

export async function initSocket(io: Server) {
  io.on('connection', async socket => {
    const token = socket.handshake.auth.token;
    const chatId = socket.handshake.query.chatId?.toString();
    //const isBranch = socket.handshake.query.isBranch || false;
    if (!chatId || !token) {
      socketError(socket, 'Chat id or token are not valid');
      socket.disconnect();
      return;
    }

    /*
    let { result, error } = isBranch
      ? await connectBranch(token, chatId)
      : await connectUser(token, chatId);
      

    if (error) {
      socketError(socket, error.message);
      socket.disconnect(true);
      return;
    }

    addUser(result!, socket.id);
    socket.on('disconnect', () => {
      removeUser(result!, socket.id);
    });
    */
  });
}

export function emitUserEvent(io: Server, userId: string, event: SocketEvent, payload?: unknown) {
  const userSocketsId = getUserIds(userId);
  if (userSocketsId) {
    userSocketsId.forEach(id => {
      io.to(id).emit(event, payload);
    });
  }
}
