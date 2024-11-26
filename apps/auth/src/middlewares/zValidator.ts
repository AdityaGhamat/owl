import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z, ZodError } from "zod";
import ResponseUtil from "../lib/response.js";
import logger from "../config/logger-config.js";

function zValidator(
  schema: z.Schema<any>,
  inputType: "query" | "body" | "params"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const input =
        inputType === "body"
          ? req.body
          : inputType === "params"
            ? req.params
            : req.query;
      const result = schema.safeParse(input);
      next();
    } catch (error: any) {
      logger.error(error);
      if (error instanceof ZodError) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json(ResponseUtil.errorResponse(error.errors, error.message));
      }
      next(error);
    }
  };
}

export default zValidator;
