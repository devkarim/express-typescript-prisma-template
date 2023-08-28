import "dotenv/config";
import moduleAlias from "module-alias";
moduleAlias.addAlias("@", __dirname);

import cors from "cors";
import express from "express";

import { env } from "./config/env";
import apiRouter from "./routes/api";
import { APP_URL } from "./config/constants";
import errorLogger from "./middlewares/error/error-logger";
import errorSender from "./middlewares/error/error-sender";
import errorHandler from "./middlewares/error/error-handler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "localhost" }));

app.use("/", apiRouter);

// Error handlers
app.use(errorHandler);
app.use(errorLogger);
app.use(errorSender);

app.listen(env.PORT, () => {
  console.log(`Listening on ${APP_URL}...`);
});
