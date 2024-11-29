import serverConfig from "../config/server-config.js";
import MailConsumer from "../controllers/mail-consumer.js";
import MailServices from "./mail-services.js";

class MailLifeCycle {
  private consumers: MailConsumer[];
  constructor() {
    this.consumers = [];
  }
  async start() {
    const mailServices = new MailServices(serverConfig.SENDER!);

    //verification consumer
    const verificationConsumer = new MailConsumer(
      "verification_mail",
      mailServices
    );
    await verificationConsumer.initialize();
    await verificationConsumer.startVerificationConsumer();
    this.consumers.push(verificationConsumer);

    //reset password consumer
    const resetPasswordConsumer = new MailConsumer(
      "reset_password_mail",
      mailServices
    );
    await resetPasswordConsumer.initialize();
    await resetPasswordConsumer.startResetPasswordEmailConsumer();
    this.consumers.push(resetPasswordConsumer);
  }

  //cleanup method
  async stop() {
    for (const consumer of this.consumers) {
      await consumer.close();
    }
  }
}

export default MailLifeCycle;
