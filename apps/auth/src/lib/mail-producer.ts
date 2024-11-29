import { mailType } from "@repo/types/src/mail.js";
import { MessageQueue } from "@repo/queue";
import type {
  resetPasswordMailType,
  verificationMailType,
} from "@repo/types/src/mail.js";
import TokenServices from "../services/token-services.js";
import logger from "../config/logger-config.js";

async function verification_Mail(message: verificationMailType) {
  const queueName: mailType = "verification_mail";
  const messageQueue = new MessageQueue(queueName);
  await messageQueue.initConnection();
  await messageQueue.sendMessage(message);
  console.log("Verification email task added to the queue.");
  await messageQueue.close();
}
async function reset_Password_Mail(message: resetPasswordMailType) {
  const queueName: mailType = "reset_password_mail";
  const messageQueue = new MessageQueue(queueName);
  await messageQueue.initConnection();
  await messageQueue.sendMessage(message);
  console.log("ResetPassoword email task added to queue");
  await messageQueue.close();
}

async function sendVerificationMail(user_id: string, email: string) {
  try {
    const tokenService = new TokenServices(user_id);
    const verification_token = await tokenService.generateVerificationCode();
    const message = { email: email, verification_token: verification_token };
    await verification_Mail(message);
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
export { verification_Mail, reset_Password_Mail, sendVerificationMail };

// const tokenService = new TokenServices(user.user_id!);
// const verification_token = await tokenService.generateVerificationCode();
// //creating message for queue
// const message = { email: user.email, verification_token };
// await verification_Mail(message);
