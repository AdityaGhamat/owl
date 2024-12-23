import { Request, Response, NextFunction } from "express";
import adminServices from "../services/admin-services.js";
import logger from "../config/logger-config.js";
import { StatusCodes } from "http-status-codes";
import ResponseUtil from "../lib/response.js";

class AdminController {
  async findMembers(req: Request, res: Response, next: NextFunction) {
    try {
      const { officeId } = req.query;
      const response = await adminServices.findMembers(officeId as string);
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
  async findUsersWithinRadius(req: Request, res: Response, next: NextFunction) {
    try {
      const { lat, lng, rd } = req.query;
      const latitude = Number(lat);
      const longitude = Number(lng);
      const radius = Number(rd);

      const center: [number, number] = [latitude, longitude];
      const response = await adminServices.findUsersWithinRadius(
        center,
        radius
      );
      if (!response) {
        return ResponseUtil.errorResponse(
          res,
          StatusCodes.NOT_FOUND,
          "Users not found"
        );
      }
      return ResponseUtil.successResponse(
        res,
        StatusCodes.OK,
        "Users found successfully",
        response
      );
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
}

export default new AdminController();
