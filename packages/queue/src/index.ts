import { connect } from "amqplib";
import type { Channel, Connection } from "amqplib";
import type { mailType } from "@repo/types/src/mail.js";
import type { attendance_queue } from "@repo/types/src/attendance.js";
class MessageQueue {
  private channel: Channel | null = null;
  private connection: Connection | null = null;
  private readonly url: string;
  private readonly queueName: mailType | attendance_queue;

  constructor(
    queueName: mailType,
    url: string = process.env.URL || "amqp://localhost"
  ) {
    this.queueName = queueName;
    this.url = url;
  }
  public async initConnection(): Promise<void> {
    if (!this.connection) {
      try {
        this.connection = await connect(this.url);
        this.channel = await this.connection.createChannel();
        await this.channel.assertQueue(this.queueName, { durable: true });
        console.log(
          `established connection and created channel ${this.queueName}`
        );
      } catch (error) {
        throw error;
      }
    }
  }

  public async getChannel(): Promise<Channel> {
    if (!this.channel) {
      await this.initConnection();
    }
    if (!this.channel) {
      throw Error("Error while getting the channels right");
    }
    return this.channel;
  }

  public async sendMessage(message: any): Promise<void> {
    try {
      this.channel = await this.getChannel();
      await this.channel.assertQueue(this.queueName, { durable: true });
      this.channel.sendToQueue(
        this.queueName,
        Buffer.from(JSON.stringify(message)),
        { persistent: true }
      );
      console.log(`message has been sent to ${this.queueName} : ${message}`);
    } catch (error) {
      throw error;
    }
  }

  public async consumeMessageQueue(
    onMessage: (message: any) => Promise<void>
  ): Promise<void> {
    try {
      this.channel = await this.getChannel();
      await this.channel.assertQueue(this.queueName, { durable: true });
      this.channel.consume(this.queueName, async (message: any) => {
        if (message) {
          const content = JSON.parse(message.content.toString());
          try {
            await onMessage(content);
            this.channel?.ack(message);
          } catch (error) {
            console.log(`error while consuming the message ${error}`);
            this.channel?.nack(message);
          }
        }
      });
      console.log(`Consuming messages from queue: ${this.queueName}`);
    } catch (error) {
      throw error;
    }
  }

  public async close(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
        console.log(`channel ${this.channel} has been closed`);
      }
      if (this.connection) {
        await this.connection.close();
        console.log(`connection ${this.connection} has been closed`);
      }
    } catch (error) {
      throw error;
    }
  }
}

export { MessageQueue };
