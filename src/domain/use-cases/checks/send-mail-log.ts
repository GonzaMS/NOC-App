import { EmailSender } from "../../../presentation/email/email-service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogsEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogsEmailUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly emailService: EmailSender
  ) {}
  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sent = await this.emailService.sendEmailWithFilesSystemLogs(to);

      if (!sent) throw new Error("Email was not sent"); 
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.ERROR,
        message: `Email was not sent: ${error}`,
        origin: "send_email_log.ts",
      });
      this.logRepository.saveLogs(log);
      return false;
    }
    return true;
  }
}
