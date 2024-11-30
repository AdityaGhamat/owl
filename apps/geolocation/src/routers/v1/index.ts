import { Hono } from "hono";
import geofenceRouter from "./geofenceRouter.js";
const app = new Hono().route("/geofence", geofenceRouter);
export default app;
