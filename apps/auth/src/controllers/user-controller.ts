import { Request, Response, NextFunction } from "express";
import userServices from "../services/user-services.js";
import logger from "../config/logger-config.js";
import ResponseUtil from "../lib/response.js";
import { CustomRequest } from "../types/system.js";
import session from "../lib/session.js";
import { userCover } from "../lib/response_covers.js";
import { sendVerificationMail } from "../lib/mail-producer.js";
import { StatusCodes } from "http-status-codes";
import type { emailType, passwordType } from "../types/auth.js";

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const { name, email, encryptedPassword, role, phoneNumber } = req.body;
    try {
      const user = await userServices.createUser({
        name,
        email,
        encryptedPassword,
        role,
        phoneNumber,
        createdAt: new Date(),
      });

      if (!user) {
        return ResponseUtil.errorResponse(res, 400, "User creation failed");
      }
      await session.createSession(user.user_id!, res);
      await sendVerificationMail(user.user_id!, user.email);
      ResponseUtil.successResponse(res, 201, "User created successfully", user);
    } catch (error: any) {
      logger.error(error.message);
      next(error);
    }
  }

  async getUser(req: CustomRequest, res: Response, next: NextFunction) {
    const user_id = req.user_id;
    try {
      const user = await userServices.getUser(user_id!);
      if (!user) {
        return ResponseUtil.errorResponse(res, 404, "User not found");
      }
      ResponseUtil.successResponse(
        res,
        200,
        "User fetched successfully",
        userCover(user)
      );
    } catch (error: any) {
      logger.error(error.message);
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, encryptedPassword } = req.body;
    try {
      const user = await userServices.login(email, encryptedPassword);
      if (!user) {
        return ResponseUtil.errorResponse(res, 401, "Invalid credentials");
      }
      await session.createSession(user.user_id!, res);
      ResponseUtil.successResponse(res, 200, "Login successful", user);
    } catch (error: any) {
      logger.error(error.message + "inside login controller");
      next(error);
    }
  }

  async verifyEmail(req: CustomRequest, res: Response, next: NextFunction) {
    const { verification_token } = req.body;
    const id = req.user_id;
    try {
      const user = await userServices.verifyEmail(id!, verification_token);
      if (!user) {
        return ResponseUtil.errorResponse(res, 401, "Failed to verify email");
      }
      return ResponseUtil.successResponse(
        res,
        StatusCodes.OK,
        `${user.email} is verified`
      );
    } catch (error: any) {
      logger.error(error.message + "inside verify email controller");
      next(error);
    }
  }

  async resendVerificationEmail(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user_id = req.user_id;
      const user = await userServices.resendVerificationEmail(user_id!);
      if (!user) {
        return ResponseUtil.errorResponse(
          res,
          StatusCodes.BAD_REQUEST,
          "Failed to send verification email"
        );
      }
      return ResponseUtil.successResponse(
        res,
        StatusCodes.OK,
        "verification code has been sent"
      );
    } catch (error) {
      next(error);
    }
  }
  async fogotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email }: emailType = req.body; // change the type to validation of it.
      const user = await userServices.forgotPassword(email);
      if (!user) {
        return ResponseUtil.errorResponse(
          res,
          StatusCodes.BAD_REQUEST,
          "Failed to send password reset email"
        );
      }
      return ResponseUtil.successResponse(
        res,
        StatusCodes.OK,
        "Sent email for resetting the password"
      );
    } catch (error) {
      next(error);
    }
  }
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { encryptedPassword }: passwordType = req.body; // change the type to validation of it.
      const { reset_token } = req.params;
      const user = await userServices.resetPassword(
        encryptedPassword,
        reset_token!
      );
      if (!user) {
        return ResponseUtil.errorResponse(
          res,
          StatusCodes.BAD_REQUEST,
          "Failed to reset password"
        );
      }
      return ResponseUtil.successResponse(
        res,
        StatusCodes.OK,
        `Password has been reset for ${user.email}`
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
