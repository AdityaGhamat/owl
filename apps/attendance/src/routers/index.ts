import v1Routes from "./v1/index.js";
import { Hono } from "hono";

const app = new Hono().route("/v1", v1Routes);

export default app;
