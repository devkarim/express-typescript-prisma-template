import "dotenv/config";
import moduleAlias from "module-alias";
moduleAlias.addAlias("@", __dirname);

import "./services/passport";

import http from "http";
import cors from "cors";
import express, { Handler } from "express";
import passport from "passport";
import { Server } from "socket.io";

import { env } from "./config/env";
import apiRouter from "./routes/api";
import errorLogger from "./middlewares/error/error-logger";
import errorSender from "./middlewares/error/error-sender";
import errorHandler from "./middlewares/error/error-handler";
import { API_URL, isProduction } from "./config/constants";
import session from "./lib/session";
import AppSocket from "./models/socket";

const app = express();
const server = http.createServer(app);

// Create socket server
AppSocket.create(server);

/* Middlewares for REST API */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "localhost" }));
if (isProduction) app.set("trust proxy", 1);
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", apiRouter);

// Error handlers
app.use(errorHandler);
app.use(errorLogger);
app.use(errorSender);

// Listen
server.listen(env.PORT, () => {
  console.log(`Listening on ${API_URL}...`);
});
