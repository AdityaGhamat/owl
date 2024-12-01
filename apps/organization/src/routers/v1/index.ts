import { Hono } from "hono";
import organizationController from "../../controllers/organization-controller.js";
const app = new Hono().route("/organization", organizationController);

export default app;
