import { Router } from "express";
import userController from "../../controllers/user-controller.js";
import authValidator from "../../middlewares/authValidator.js";
import { userSchema, loginSchema, verifyEmailSchema } from "@repo/validations";
import zValidator from "../../middlewares/zValidator.js";

const app = Router();
app.post("/", zValidator(userSchema, "body"), userController.createUser);
app.post("/login", zValidator(loginSchema, "body"), userController.login);
app.get("/", authValidator, userController.getUser);
app.put(
  "/verify",
  authValidator,
  zValidator(verifyEmailSchema, "body"),
  userController.verifyEmail
);
app.get(
  "/resend_verification_email",
  authValidator,
  userController.resendVerificationEmail
);
export default app;
