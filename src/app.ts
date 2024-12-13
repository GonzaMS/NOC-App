import "dotenv/config";
import { envs } from "./config/envs.plugin";
import { MongoConnection } from "./data/mongo-config/init";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

async function main() {
  await MongoConnection.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  // Create log
  // const newLog = LogModel.create({
  //   level: "info",
  //   message: "Hello, world!",
  //   origin: "app.ts",
  // });

  // (await newLog).save();

  Server.start();
}
