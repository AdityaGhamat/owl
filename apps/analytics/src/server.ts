import { Hono } from "hono";
import { serve } from "@hono/node-server";
import messageConsume from "./lib/queue/consumer.js";
import { HTTPException } from "hono/http-exception";
class Server {
  private app: Hono;
  constructor() {
    this.app = new Hono();
    this.routes();
    this.errorConfig();
    this.serverConfig();
  }
  private serverConfig() {}
  private errorConfig() {
    this.app.onError((err, c) => {
      if (err instanceof HTTPException) {
        return err.getResponse();
      }
      return new Response("Internal Server Error: " + err.message, {
        status: 500,
      });
    });
  }
  private routes() {}
  public async start() {
    await messageConsume.consume();
    serve({
      fetch: this.app.fetch,
      port: 3009,
    });
    console.log(`server is started at http://localhost:3009`);
  }
}

export default new Server();
