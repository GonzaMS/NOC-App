import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

// type SuccessCallback = () => void;
// type ErrorCallback = (error: string) => void;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  constructor(
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback,
    private readonly logRepository: LogRepository[]
  ) {}

  private callLogs(log: LogEntity) {
    this.logRepository.forEach((logRepository) => {
      logRepository.saveLogs(log);
    });
  }

  public async execute(url: string): Promise<boolean> {
    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Error on check service ${url}`);
      }

      const log = new LogEntity({
        message: `Service with ${url} working`,
        level: LogSeverityLevel.INFO,
        origin: "check-service.ts",
      });

      this.callLogs(log);

      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      const errorString = ` ${url} is not ok. ${error}`;

      const log = new LogEntity({
        message: errorString,
        level: LogSeverityLevel.ERROR,
        origin: "check-service.ts",
      });

      this.callLogs(log);

      this.errorCallback && this.errorCallback(`${errorString}`);
      return false;
    }
  }
}
