import { Response, NextFunction, response } from "express";
import session from "../lib/session.js";
import type { CustomRequest } from "../types/system.js";
import ResponseUtil from "../lib/response.js";
import { StatusCodes } from "http-status-codes";
import logger from "../config/logger-config.js";
async function authValidator(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = await session.verifySession(req, res);
    if (!userId) {
      const errorResponse = ResponseUtil.errorResponse(
        {},
        "login or signup required",
        StatusCodes.UNAUTHORIZED
      );
      res.status(StatusCodes.UNAUTHORIZED).json(errorResponse);
    }
    req.user_id = userId;
    next();
  } catch (error: any) {
    logger.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        ResponseUtil.errorResponse(
          error,
          error.message,
          StatusCodes.INTERNAL_SERVER_ERROR
        )
      );
  }
}
export default authValidator;
