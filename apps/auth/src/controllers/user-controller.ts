import { Request, Response, NextFunction } from "express";
import userServices from "../services/user-services.js";
import logger from "../config/logger-config.js";
import ResponseUtil from "../lib/response.js";
import { CustomRequest } from "../types/system.js";
import session from "../lib/session.js";
import { userCover } from "../lib/response_covers.js";
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
}

export default new UserController();
