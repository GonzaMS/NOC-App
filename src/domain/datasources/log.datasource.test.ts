import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDataSource } from "./log.datasource";

describe("log.datasource.test.ts", () => {
  const newLog = new LogEntity({
    level: LogSeverityLevel.INFO,
    message: "test-message",
    origin: "log.datasource.test.ts",
  });

  class MockLogDatasource implements LogDataSource {
    async saveLogs(log: LogEntity): Promise<void> {
      return;
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [newLog];
    }
  }

  test("Should implement the LogDataSource abstract class", async () => {
    const mockLogDatasource = new MockLogDatasource();

    expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
    expect(typeof mockLogDatasource.saveLogs).toHaveProperty("saveLogs");
    expect(typeof mockLogDatasource.getLogs).toHaveProperty("getLogs");

    await mockLogDatasource.saveLogs(newLog);
    const logs = await mockLogDatasource.getLogs(LogSeverityLevel.INFO);

    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});
