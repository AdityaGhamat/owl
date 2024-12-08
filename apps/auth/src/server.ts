import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import Env from "./config/server-config.js";
import apiRoutes from "./routes/index.js";
import cookieParser from "cookie-parser";
import * as trpcExpress from "@trpc/server/adapters/express";
import appRouter from "./trpc/router/index.js";
import ErrorMiddleware from "./middlewares/errorMiddleware.js";
import BadRequestException from "./errors/badRequestException.js";
import databaseConnection from "./config/mongoose-config.js";
class Server {
  private app = express();
  constructor() {
    this.serverconfig();
    this.routes();
  }
  private serverconfig() {
    this.app.use(cookieParser());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes() {
    this.app.get("/", (_req: Request, res: Response) => {
      res.json({
        name: "owl",
        service: "auth-service",
        total_services: "unknown",
        isrunning: "unknown",
      });
    });
    this.app.use("/api", apiRoutes);
    this.app.use(
      "/trpc",
      trpcExpress.createExpressMiddleware({
        router: appRouter,
      })
    );
    this.app.get(
      "/error",
      (_req: Request, _res: Response, next: NextFunction) => {
        throw new BadRequestException("custom error");
      }
    );
    this.app.use(ErrorMiddleware);
  }
  public async start() {
    await databaseConnection();
    this.app.listen(Env.PORT, () => {
      console.log(`server is running on http://localhost:${Env.PORT}`);
    });
  }
}

export default new Server();
