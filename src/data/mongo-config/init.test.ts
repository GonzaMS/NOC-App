import { MongoConnection } from "./init";
import mongoose from "mongoose";

describe("Testing MongoDB", () => {
  afterAll(async () => {
    mongoose.connection.close();
  });

  test("Should the connection be successful", async () => {
    const connected = await MongoConnection.connect({
      dbName: process.env.MONGO_DB_NAME!,
      mongoUrl: process.env.MONGO_URL!,
    });

    expect(connected).toBeTruthy();
  });

  test("Should return an error", async () => {
    try {
      const connected = await MongoConnection.connect({
        dbName: process.env.MONGO_DB_NAME!,
        mongoUrl: "mongodb://gonzams:123456@localhossst:27017",
      });

      expect(connected).toBeFalsy();
    } catch (error) {}
  });
});
