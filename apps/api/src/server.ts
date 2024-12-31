import express from "express";
import serverConfig from "./config/server-config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
class Server {
  private app;
  constructor() {
    this.app = express();
  }
  private config() {
    this.app.use(cors());
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  private routes() {}
  public start() {
    this.app.listen(() => {
      console.log(
        `gateway is ready to start on http://localhost:${serverConfig.PORT || "3010"}`
      );
    });
  }
}

export default new Server();
