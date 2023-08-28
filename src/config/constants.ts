import { env } from "./env";

export const isDevelopment = env.NODE_ENV === "development";
export const isProduction = env.NODE_ENV === "production";

export const APP_URL = isDevelopment
  ? "http://localhost:8000"
  : "https://api.example.com";
