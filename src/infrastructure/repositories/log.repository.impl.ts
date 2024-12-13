import {
  LogDataSource,
  LogEntity,
  LogRepository,
  LogSeverityLevel,
} from "../../domain";

export class LogRepositoryImpl implements LogRepository {
  constructor(private readonly logDatasource: LogDataSource) {}

  async saveLogs(log: LogEntity): Promise<void> {
    return this.logDatasource.saveLogs(log);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(severityLevel);
  }
}
