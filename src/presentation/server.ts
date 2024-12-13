import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { EmailSender } from "./email/email-service";

const fileSystemLogRepository = new LogRepositoryImpl(
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

    // CronService.createJob("*/10 * * * * *", () => {
    //   const url = "http://google.com";
    //   new CheckService(
    //     () => console.log(`url ${url} is up`),
    //     (error) => console.log(error),
    //     fileSystemLogRepository
    //   ).execute(url);
    // });
  }
}
