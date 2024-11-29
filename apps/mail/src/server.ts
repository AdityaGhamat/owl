import Fastify from "fastify";
import MailLifeCycle from "./service/mail-lifecycle.js";

class Server {
  private fastify;
  private mailLifeCycle: MailLifeCycle;
  constructor() {
    this.fastify = Fastify({
      logger: true,
    });
    this.mailLifeCycle = new MailLifeCycle();
  }
  private registerHook() {
    this.fastify.addHook("onReady", async () => {
      try {
        await this.mailLifeCycle.start();
        console.log("Mail consumers started successfully.");
      } catch (error: any) {
        this.fastify.log.error(
          `Failed to start mail consumers: ${error.message}`
        );
        process.exit(1);
      }
    });

    this.fastify.addHook("onClose", async () => {
      try {
        await this.mailLifeCycle.stop();
        console.log("Mail consumers stopped gracefully.");
      } catch (error: any) {
        this.fastify.log.error(
          `Error while stopping mail consumers: ${error.message}`
        );
      }
    });
  }

  private registerRoutes() {
    this.fastify.get("/", (req, reply) => {
      return {
        name: "owl",
        service: "mail-service",
        total_services: "unknown",
        isrunning: "unknown",
      };
    });
  }
  public async start() {
    this.registerHook();
    this.registerRoutes();

    try {
      await this.fastify.listen({ port: 3004 });
      this.fastify.log.info(`Server listening at http://localhost:3004`);
    } catch (err) {
      this.fastify.log.error(err);
      process.exit(1);
    }
  }
}
export default new Server();
