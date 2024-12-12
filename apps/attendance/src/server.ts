import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { HTTPException } from "hono/http-exception";
import { cors } from "hono/cors";

class Server {
  private app: Hono;
  constructor() {
    this.app = new Hono();
    this.errorconfig();
    this.routes();
    this.serverconfig();
  }
  private errorconfig() {
    this.app.onError((err, c) => {
      if (err instanceof HTTPException) {
        return err.getResponse();
      }
      return new Response("Internal Server Error: " + err.message, {
        status: 500,
      });
    });
  }
  private serverconfig() {
    this.app.use("/api/*", cors());
  }
  private routes() {}
  public start() {
    serve({
      fetch: this.app.fetch,
      port: 3007,
    });
    console.log(`server is started at http://localhost:3007`);
  }
}

export default new Server();
