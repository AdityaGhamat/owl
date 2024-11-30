import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { homeRouter } from "./routers/homeRouter.js";
import { HTTPException } from "hono/http-exception";
import { databaseConnection } from "./config/database-config.js";
import apiRouter from "./routers/index.js";
class Server {
  private app: Hono;
  constructor() {
    this.app = new Hono();
    this.routerConfig();
    this.config();
    this.errorConfig();
  }
  private routerConfig() {
    this.app.basePath("/").route("/api", apiRouter);
  }
  private config() {
    this.app.use(logger());
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
    await databaseConnection();
    serve({
      fetch: this.app.fetch,
      port: 3005,
    });
    console.log(`server is started on http://localhost:3005`);
  }
}

export default new Server();
