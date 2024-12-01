import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { HTTPException } from "hono/http-exception";
import { databaseConnection } from "./config/database-config.js";
import apiRoutes from "./routers/index.js";
class Server {
  private app: Hono;
  constructor() {
    this.app = new Hono();
    this.errorConfig();
    this.routerConfig();
  }
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
  private routerConfig() {
    this.app.route("/api", apiRoutes);
  }
  public async start() {
    await databaseConnection();
    serve({
      fetch: this.app.fetch,
      port: 3006,
    });
    console.log(`server is started on http://localhost:3006`);
  }
}

export default new Server();
