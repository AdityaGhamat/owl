import { Router } from "express";
import userRoutes from "./user-routes.js";
const app = Router();
app.use("/user", userRoutes);

export default app;
