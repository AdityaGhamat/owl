import { Hono } from "hono";
import geofenceController from "../../controllers/geofence-controllers.js";

const app = new Hono()
  .route("/", geofenceController)
  .get("/test", async (c) => {
    return c.json({
      test: "test",
    });
  });

export default app;
