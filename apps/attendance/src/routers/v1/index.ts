import { Hono } from "hono";
import attendanceController from "../../controllers/attendance-controller.js";

const app = new Hono().route("/attendance", attendanceController);

export default app;
