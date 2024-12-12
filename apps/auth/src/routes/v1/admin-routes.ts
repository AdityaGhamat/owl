import { Router } from "express";
import adminController from "../../controllers/admin-controller.js";

const app = Router();
app.get("/members", adminController.findMembers);
app.get("/users", adminController.findUsersWithinRadius);
export default app;
