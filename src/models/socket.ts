import http from "http";
import passport from "passport";
import { Server } from "socket.io";
import { Session } from "express-session";

import session from "@/lib/session";

import SocketHandler from "./socket-handler";

declare module "http" {
  interface IncomingMessage {
    session: Session & {
      authenticated: boolean;
    };
    user?: Express.User;
  }
}

class AppSocket {
  public static io: Server;

  static useMiddlewares() {
    // Session middlewares
    this.io.engine.use(session);
    this.io.engine.use(passport.initialize());
    this.io.engine.use(passport.session());
  }

  static start() {
    this.io.on("connection", (socket) => {
      SocketHandler.addSocket(socket);
      socket.on("disconnect", () => {
        SocketHandler.removeSocket(socket);
      });
    });
  }

  static create(httpServer: http.Server) {
    if (!this.io) {
      this.io = new Server(httpServer);
      this.useMiddlewares();
      this.start();
    }
  }
}

export default AppSocket;
