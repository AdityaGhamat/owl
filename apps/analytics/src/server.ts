import { Hono } from "hono";
import { serve } from "@hono/node-server";
class Server {
  private app: Hono;
  constructor() {
    this.app = new Hono();
    this.routes();
    this.errorConfig();
    this.serverConfig();
  }
  private serverConfig() {}
  private errorConfig() {}
  private routes() {}
  public async start() {
    serve({
      fetch: this.app.fetch,
      port: 3009,
    });
    console.log(`server is started at http://localhost:3009`);
  }
}

export default new Server();
