import { MessageQueue } from "@repo/queue";
import serverConfig from "../../config/server-config.js";
import { mailType } from "@repo/types/src/mail.js";
import { attendance_queue_Type } from "@repo/types/src/attendance.js";
import { members } from "../../types/services/index.js";
class MessageProducer {
  private messageQueue;
  private message: attendance_queue_Type;
  constructor(queueName: mailType, message: attendance_queue_Type) {
    this.messageQueue = new MessageQueue(queueName);
    this.message = message;
  }
  async withTimeOut<T>(promise: Promise<T>, timeout: number): Promise<T> {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) =>
        setTimeout(() => reject(new Error("Timeout exceeded")), timeout)
      ),
    ]);
  }
  async markAttendance() {
    try {
      await this.withTimeOut(this.messageQueue.initConnection(), 5000);
      await this.withTimeOut(this.messageQueue.sendMessage(this.message), 5000);
    } catch (error) {
      console.error("Failed to send mark attendance message:", error);
      throw error;
    } finally {
      await this.messageQueue.close();
    }
  }
}
export default MessageProducer;
