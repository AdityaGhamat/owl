import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { HTTPException } from "hono/http-exception";
import { databaseConnection } from "./config/database-config.js";
import apiRoutes from "./routers/index.js";
import { cors } from "hono/cors";
class Server {
  private app: Hono;
  constructor() {
    this.app = new Hono();
    this.errorConfig();
    this.routesConfig();
  }
  private routesConfig() {
    this.app.use("/api/*", cors());

    this.app.route("/api", apiRoutes);
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
  public async start() {
    serve({
      fetch: this.app.fetch,
      port: 3006,
    });
    await databaseConnection();
    console.log(`server is initiated at http://localhost:3006`);
  }
}

export default new Server();
