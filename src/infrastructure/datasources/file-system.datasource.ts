import fs from "fs";
import { LogDataSource, LogEntity, LogSeverityLevel } from "../../domain";

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/logs-low.log";
  private readonly mediumLogsPath = "logs/logs-medium.log";
  private readonly highLogsPath = "logs/logs-hight.log";

  constructor() {
    this.createLogsFile();
  }

  private createLogsFile = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath, { recursive: true });
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (!fs.existsSync(path)) {
          fs.writeFileSync(path, "");
        }
      }
    );
  };

  async saveLogs(newLog: LogEntity): Promise<void> {
    const JsonAsLog = `${JSON.stringify(newLog)} \n`;
    fs.appendFileSync(this.allLogsPath, JsonAsLog);

    if (newLog.level === LogSeverityLevel.INFO) return;

    if (newLog.level === LogSeverityLevel.WARN) {
      fs.appendFileSync(this.mediumLogsPath, JsonAsLog);
    } else {
      fs.appendFileSync(this.highLogsPath, JsonAsLog);
    }
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, "utf-8");

    if (content === "") return [];

    const logs = content.split("\n").map(LogEntity.fromJson);

    return logs;
  };

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.INFO:
        return this.getLogsFromFile(this.allLogsPath);

      case LogSeverityLevel.WARN:
        return this.getLogsFromFile(this.mediumLogsPath);

      case LogSeverityLevel.ERROR:
        return this.getLogsFromFile(this.highLogsPath);

      default:
        throw new Error(`${severityLevel} not implemented`);
    }
  }
}
