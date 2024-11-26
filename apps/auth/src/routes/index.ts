import v1Routes from "./v1/index.js";
import { Router } from "express";
const app = Router();
app.use("/v1", v1Routes);
export default app;
