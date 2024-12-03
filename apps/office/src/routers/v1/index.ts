import { Hono } from "hono";
import officeControllers from "../../controllers/office-controllers.js";

const app = new Hono().route("/office", officeControllers);

export default app;
