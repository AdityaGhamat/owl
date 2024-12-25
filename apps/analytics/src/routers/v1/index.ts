import { Hono } from "hono";
import attendanceController from "../../controllers/attendance-analytics-controller.js";

const app = new Hono().basePath("/").route("/attendance", attendanceController);
export default app;
