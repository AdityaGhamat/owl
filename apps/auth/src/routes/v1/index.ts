import { Router } from "express";
import userRoutes from "./user-routes.js";
import adminRoutes from "./admin-routes.js";
const app = Router();
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
export default app;
