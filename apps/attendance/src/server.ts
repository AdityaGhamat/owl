import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { HTTPException } from "hono/http-exception";
import { cors } from "hono/cors";
import apiRoutes from "./routers/index.js";
import connectionDb from "./config/mongoose-config.js";
import startJob from "./jobs/index.js";
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
  private routes() {
    this.app.route("/api", apiRoutes);
  }
  public async start() {
    await connectionDb();
    startJob();
    serve({
      fetch: this.app.fetch,
      port: 3008,
    });
    console.log(`server is started at http://localhost:3008`);
  }
}

export default new Server();
