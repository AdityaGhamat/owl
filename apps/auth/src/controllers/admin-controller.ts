import { Request, Response, NextFunction } from "express";
import adminServices from "../services/admin-services.js";
import logger from "../config/logger-config.js";
import { StatusCodes } from "http-status-codes";
import ResponseUtil from "../lib/response.js";

class AdminController {
  async findMembers(req: Request, res: Response, next: NextFunction) {
    try {
      const { officeId } = req.query;
      console.log(officeId, "inside admincontroller");
      const response = await adminServices.findMembers(officeId as string);
      console.log(response);
      if (!response || response.length === 0) {
        return ResponseUtil.errorResponse(
          res,
          StatusCodes.NOT_FOUND,
          "Members not found"
        );
      }
      return ResponseUtil.successResponse(
        res,
        StatusCodes.OK,
        "Members are found",
        response
      );
    } catch (error: any) {
      logger.error(error.message);
      next(error);
    }
  }
}

export default new AdminController();
