import { after } from "node:test";
import { envs } from "../../../config/envs.plugin";
import { MongoConnection } from "../init";
import mongoose from "mongoose";
import { LogModel } from "./log.model";

describe("log.model.test.ts", () => {
  beforeAll(async () => {
    await MongoConnection.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  test("should return LogModel", async () => {
    const logData = {
      origin: "log.model.test.ts",
      message: "test-message",
      level: "info",
    };

    const log = await LogModel.create(logData);

    expect(log).toEqual(
      expect.objectContaining({
        ...logData,
        id: expect.any(String),
        createdAt: expect.any(Date),
      })
    );

    await LogModel.findByIdAndDelete(log.id);
  });

  test("Should return the schema object", async () => {
    const schema = LogModel.schema.obj;

    expect(schema).toEqual(
      expect.objectContaining({
        level: {
          type: String,
          enum: ["info", "warn", "error"],
          required: true,
          default: "info",
        },
        message: { type: String, required: true },

        origin: { type: String },

        createdAt: { type: Date, default: expect.any(Function) },
      })
    );
  });
});
