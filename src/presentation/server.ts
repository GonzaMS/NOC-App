import { LogRepository, LogSeverityLevel } from "../domain";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailSender } from "./email/email-service";

const fsLogRepository = new LogRepositoryImpl(new FileSystemDataSource());

const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());

const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);

const emailService = new EmailSender();

export class Server {
  constructor() {}
  public static async start() {
    console.log("server started");

    // new SendEmailLogs(fileSystemLogRepository, emailService).execute([
    //   "toSomeOne@gmail.com",
    // ]);

    // const log = await logRepository.getLogs(LogSeverityLevel.INFO);
    // console.log(log);

    CronService.createJob("*/10 * * * * *", () => {
      const url = "http://google.com";
      new CheckServiceMultiple(
        () => console.log(`url ${url} is up`),
        (error) => console.log(error),
        [fsLogRepository, mongoLogRepository, postgresLogRepository]
      ).execute(url);
    });
  }
}
