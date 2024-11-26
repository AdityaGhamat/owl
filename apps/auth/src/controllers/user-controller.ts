import { NextFunction, Request, Response } from "express";
import userServices from "../services/user-services.js";
import logger from "../config/logger-config.js";
import { userCreation } from "../types/auth.js";
import ErrorHandler from "../errors/error.js";
import { StatusCodes } from "http-status-codes";
import ResponseUtil from "../lib/response.js";
import { CustomRequest } from "../types/system.js";
import session from "../lib/session.js";
import { userCover } from "../lib/response_covers.js";

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const { name, email, encryptedPassword, role, phoneNumber }: userCreation =
      req.body;
    try {
      console.log(req.body);
      const user = await userServices.createUser({
        name,
        email,
        encryptedPassword,
        role,
        phoneNumber,
        createdAt: new Date(Date.now()),
      });
      if (!user) {
        throw new ErrorHandler("User is not created", StatusCodes.BAD_REQUEST);
      }
      const successResponse = ResponseUtil.successResponse(
        "user is created",
        {}
      );
      await session.createSession(user.user_id!, res);
      res.status(StatusCodes.CREATED).json(successResponse);
    } catch (error: any) {
      logger.error(error.message + "in user controller");
      if (error instanceof ErrorHandler) {
        next(error);
      }
    }
  }

  async getUser(req: CustomRequest, res: Response, next: NextFunction) {
    const userId = req.user_id;
    try {
      const user = await userServices.getUser(userId!);
      if (!user) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json(
            ResponseUtil.errorResponse(
              {},
              "User not found",
              StatusCodes.NOT_FOUND
            )
          );
      }
      res
        .status(StatusCodes.OK)
        .json(
          ResponseUtil.successResponse(
            "User found successfully",
            userCover(user)
          )
        );
    } catch (error: any) {
      logger.error(error.message);
      if (error instanceof ErrorHandler) {
        next(error);
      }
    }
  }
}

export default new UserController();
