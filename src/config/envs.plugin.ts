import "dotenv/config";
import * as env from "env-var";

export const envs = {
  // PORT: env.get("PORT").required().asIntPositive(),

  MAIL: env.get("MAILER_EMAIL").required().asEmailString(),
  SECRET: env.get("MAILER_SECRET_KEY").required().asString(),
  PROD: env.get("PROD").default("false").asBool(),
  MAIL_SERVICE: env.get("MAILER_SERVICE").required().asString(),

  // Mongo config
  MONGO_URL: env.get("MONGO_URL").required().asString(),
  MONGO_DB_NAME: env.get("MONGO_DB_NAME").required().asString(),
  MONGO_USER: env.get("MONGO_URL").required().asString(),
  MONGO_PASS: env.get("MONGO_URL").required().asString(),

  // Postgresql config
  POSTGRES_URL: env.get("POSTGRES_URL").required().asString(),
  POSTGRES_DB_NAME: env.get("POSTGRES_DB_NAME").required().asString(),
  POSTGRES_USER: env.get("POSTGRES_USER").required().asString(),
  POSTGRES_PASS: env.get("POSTGRES_PASS").required().asString(),
};
