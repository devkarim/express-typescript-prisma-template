import { Socket } from "socket.io";

class SocketHandler {
  private static sockets: Socket[] = [];
  private static authSockets: Socket[] = [];

  static getSocketById(id: string) {
    return this.sockets.find((s) => s.id === id);
  }

  static getSocketByUserId(userId: number) {
    return this.sockets.find((s) => s.request.user?.id === userId);
  }

  static addSocket(socket: Socket) {
    this.sockets.push(socket);
    if (socket.request.user) {
      this.authSockets.push(socket);
    }
  }

  static removeSocket(socket: Socket) {
    this.sockets = this.sockets.filter((s) => s.id != socket.id);
    this.authSockets = this.authSockets.filter((s) => s.id != socket.id);
  }
}

export default SocketHandler;
