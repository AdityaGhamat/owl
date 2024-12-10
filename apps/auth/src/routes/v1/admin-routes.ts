import { Router } from "express";
import adminController from "../../controllers/admin-controller.js";

const app = Router();
app.get("/members", adminController.findMembers);

export default app;
