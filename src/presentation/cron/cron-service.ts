import { CronJob } from "cron";

type cronTime = string | Date;
type onTick = () => void;

export class CronService {
  constructor() {}

  public static createJob(cronTime: cronTime, onTick: onTick): CronJob {
    const job = new CronJob(
      cronTime,
      onTick,
      null, // onComplete
      true, // start
      "America/Los_Angeles" // timeZone
    );
    job.start();
    return job;
  }
}
