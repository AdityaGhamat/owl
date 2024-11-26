import { Router } from "express";
import userController from "../../controllers/user-controller.js";
import authValidator from "../../middlewares/authValidator.js";
import { userSchema } from "@repo/validations";
import zValidator from "../../middlewares/zValidator.js";
const app = Router();
app.post("/", zValidator(userSchema, "body"), userController.createUser);
app.get("/", authValidator, userController.getUser);
export default app;
