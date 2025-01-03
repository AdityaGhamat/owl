import { Router } from "express";
import userController from "../../controllers/user-controller.js";
import authValidator from "../../middlewares/authValidator.js";
import {
  userSchema,
  loginSchema,
  verifyEmailSchema,
  resetTokenSchema,
  passwordSchema,
  emailSchema,
  employeeIdSchema,
} from "@repo/validations";
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
app.put(
  "/forgot_password",
  zValidator(emailSchema, "body"),
  userController.fogotPassword
);
app.put(
  "/reset_password/:reset_token",
  zValidator(resetTokenSchema, "params"),
  zValidator(passwordSchema, "body"),
  userController.resetPassword
);
app.get("/distance", userController.getDistanceFromOffice);
app.get("/location", userController.getUserLocation);
app.put("/location", userController.updateLocation);
app.post(
  "/employees",
  zValidator(employeeIdSchema, "body"),
  userController.getAllEmployee
);
export default app;

//add zvalidator schema for validating params in getdistance and validate it
