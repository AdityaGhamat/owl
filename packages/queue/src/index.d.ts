import type { Channel } from "amqplib";
import type { mailType } from "@repo/types/src/mail.js";
declare class MessageQueue {
    private channel;
    private connection;
    private readonly url;
    private readonly queueName;
    constructor(queueName: mailType, url?: string);
    initConnection(): Promise<void>;
    getChannel(): Promise<Channel>;
    sendMessage(message: any): Promise<void>;
    consumeMessageQueue(onMessage: (message: any) => Promise<void>): Promise<void>;
    close(): Promise<void>;
}
export { MessageQueue };
//# sourceMappingURL=index.d.ts.map