import { MessageQueue } from "@repo/queue";
import { attendance_queue_Type } from "@repo/types/src/attendance.js";
import { HTTPException } from "hono/http-exception";
import { StatusCodes } from "http-status-codes";
import asyncServer from "../services/external-services.js";
import serverConfig from "../../config/server-config.js";
class MessageConsume {
  private messageQueue;
  constructor() {
    this.messageQueue = new MessageQueue("attendance_queue");
  }
  private async messageHandler(message: attendance_queue_Type) {
    try {
      const { officeId, members } = message;
      const response = await asyncServer.getPresentMembers(officeId, members);
      if (!response) {
        throw new HTTPException(StatusCodes.BAD_REQUEST, {
          message: "Marking of attendance has been failed ",
        });
      }
      console.log(response);
    } catch (error: any) {
      console.error(`Failed to process attendance: ${error.message}`);
    }
  }
  async consume() {
    try {
      await this.messageQueue.initConnection();
      await this.messageQueue.consumeMessageQueue(this.messageHandler);
    } catch (error: any) {
      console.error(`Failed to start attendance consumer: ${error.message}`);
    }
  }
}
export default new MessageConsume();
