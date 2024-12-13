import { LogRepository, LogSeverityLevel } from "../domain";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { MongoDbDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailSender } from "./email/email-service";

const logRepository = new LogRepositoryImpl(
  // new MongoDbDataSource()
  new FileSystemDataSource()
);

const emailService = new EmailSender();

export class Server {
  constructor() {}
  public static async start() {
    console.log("server started");

    // new SendEmailLogs(fileSystemLogRepository, emailService).execute([
    //   "cristhianmareccos2222@gmail.com",
    // ]);

    const log = await logRepository.getLogs(LogSeverityLevel.INFO);
    console.log(log);

    // CronService.createJob("*/10 * * * * *", () => {
    //   const url = "http://google.com";
    //   new CheckService(
    //     () => console.log(`url ${url} is up`),
    //     (error) => console.log(error),
    //     logRepository
    //   ).execute(url);
    // });
  }
}
