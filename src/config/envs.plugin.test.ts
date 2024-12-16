import { error } from "console";
import { envs } from "./envs.plugin";

describe("envs.plugins.ts", () => {
  test("should return the env options", () => {
    expect(envs).toEqual({
      MAIL: "cristhianmareccos2222@gmail.com",
      SECRET: "kfjymzvmqianolht",
      PROD: false,
      MAIL_SERVICE: "gmail",
      MONGO_URL: "mongodb://gonzams:123456@localhost:27017",
      MONGO_DB_NAME: "NOC-TEST",
      MONGO_USER: "mongodb://gonzams:123456@localhost:27017",
      MONGO_PASS: "mongodb://gonzams:123456@localhost:27017",
      POSTGRES_URL: "postgresql://postgres:123456@localhost:5432/NOC",
      POSTGRES_DB_NAME: "NOC-TEST",
      POSTGRES_USER: "postgres",
      POSTGRES_PASS: "123456",
    });
  });

  test("should return an error if some envs are missing", async () => {
    jest.resetModules();

    process.env.MONGO_DB_NAME = "";

    try {
      await import("./envs.plugin");
      expect(true).toBe(false);
    } catch (e) {
      console.log(error);
    }
  });
});
