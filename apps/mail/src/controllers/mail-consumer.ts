import { MessageQueue } from "@repo/queue";
import MailServices from "../service/mail-services.js";
import serverConfig from "../config/server-config.js";
import {
  mailType,
  verificationMailType,
  resetPasswordMailType,
} from "@repo/types/src/mail.js";

class MailConsumer {
  private mailServices: MailServices;
  private messageQueue: MessageQueue;
  constructor(
    private queueName: mailType,
    mailServices: MailServices
  ) {
    this.mailServices = mailServices;
    this.messageQueue = new MessageQueue(queueName);
  }
  async initialize() {
    await this.messageQueue.initConnection();
    console.log(`Listening for messages on queue: ${this.queueName}`);
  }
  async consume(callback: (message: any) => Promise<void>) {
    await this.messageQueue.consumeMessageQueue(async (content) => {
      if (!content) {
        throw Error("Content is not present");
      }
      try {
        await callback(content);
      } catch (error) {
        console.error(
          `Error processing message from ${this.queueName}:`,
          error
        );
      }
    });
  }
  async startVerificationConsumer() {
    console.log(
      `vericiation consumer is started for mail of queue ${this.queueName}`
    );
    await this.consume(async (message: verificationMailType) => {
      const { email, verification_token } = message;
      const result = await this.mailServices.sendVerification_Mail(
        email,
        verification_token
      );
      if (result) {
        console.log(`verification mail has been sent to ${email}`);
      }
    });
  }

  async startResetPasswordEmailConsumer() {
    console.log(
      `reset password consumer is started for mail of queue ${this.queueName}`
    );
    this.consume(async (message: resetPasswordMailType) => {
      const { reset_password_token, email } = message;
      const result = await this.mailServices.sendPassword_Rest_Mail(
        email,
        reset_password_token
      );
      if (result) {
        console.log(`rest password token has been sent to ${email}`);
      }
    });
  }

  async close() {
    this.messageQueue.close();
    console.log(`connection has been closed with ${this.queueName}`);
  }
}

export default MailConsumer;
