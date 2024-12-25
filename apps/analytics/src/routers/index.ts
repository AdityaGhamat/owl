import { Hono } from "hono";
import v1Routes from "./v1/index.js";

const app = new Hono().route("/v1", v1Routes);
export default app;
