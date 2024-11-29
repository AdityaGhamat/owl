import { mailType } from "@repo/types/src/mail.js";
import { MessageQueue } from "@repo/queue";
import type {
  resetPasswordMailType,
  verificationMailType,
} from "@repo/types/src/mail.js";

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

export { verification_Mail, reset_Password_Mail };
