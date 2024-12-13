import nodemailer from "nodemailer";
import { envs } from "../../config/envs.plugin";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachments[];
}

interface Attachments {
  filename: string;
  path: string;
}

export class EmailSender {
  private transporter = nodemailer.createTransport({
    service: envs.MAIL_SERVICE,
    auth: {
      user: envs.MAIL,
      pass: envs.SECRET,
    },
  });

  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFilesSystemLogs(to: string | string[]): Promise<boolean> {
    const subject = "Server logs";
    const htmlBody = `
      <h1>Server logs</h1>
      <p>Here are the logs from the server</p>
    `;

    const attachments = [
      {
        filename: "logs.low.log",
        path: "./logs/logs-low.log",
      },
      {
        filename: "logs.medium.log",
        path: "./logs/logs-medium.log",
      },
      {
        filename: "logs.hight.log",
        path: "./logs/logs-hight.log",
      },
    ];

    try {
      await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}
