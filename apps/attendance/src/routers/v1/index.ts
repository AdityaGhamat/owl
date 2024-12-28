import { Hono } from "hono";
import attendanceController from "../../controllers/attendance-controller.js";
// import attendanceHistoryController from "../../controllers/attendance-history-controller.js";
const app = new Hono().route("/attendance", attendanceController);
// .route("/attendance-history", attendanceHistoryController);

export default app;
