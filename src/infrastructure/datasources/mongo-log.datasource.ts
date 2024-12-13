import { LogModel } from "../../data/mongo-config/models/log.model";
import { LogDataSource, LogEntity, LogSeverityLevel } from "../../domain";

export class MongoDbDataSource implements LogDataSource {
  async saveLogs(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
    console.log("Mongo log created", newLog);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({ level: severityLevel });

    return logs.map(LogEntity.fromObject);
  }
}
