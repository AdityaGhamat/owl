import { Hono } from "hono";
import v1Router from "./v1/index.js";
const app = new Hono().route("/v1", v1Router);

export default app;
