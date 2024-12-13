import { PrismaClient, SeverityLeveL } from "@prisma/client";
import { LogDataSource, LogEntity, LogSeverityLevel } from "../../domain";
import { log } from "console";

const prisma = new PrismaClient();

const severityEnum = {
  info: SeverityLeveL.INFO,
  warn: SeverityLeveL.WARN,
  error: SeverityLeveL.ERROR,
};

export class PostgresLogDatasource implements LogDataSource {
  async saveLogs(log: LogEntity): Promise<void> {
    const level = severityEnum[log.level];

    await prisma.logModel.create({
      data: {
        ...log,
        level: level,
      },
    });
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[severityLevel];

    const logs = await prisma.logModel.findMany({
      where: {
        level: level,
      },
    });

    return logs.map(LogEntity.fromObject);
  }
}
