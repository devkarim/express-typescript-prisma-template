import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

import { env } from "@/config/env";
import { isProduction, API_DOMAIN } from "@/config/constants";

import prisma from "./prisma";

const session = expressSession({
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    secure: isProduction,
    domain: API_DOMAIN,
  },
  secret: env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000, //ms
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
});

export default session;
