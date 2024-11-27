import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import ResponseUtil from "../lib/response.js";

function zValidator(
  schema: z.Schema<any>,
  inputType: "query" | "body" | "params"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const input =
      inputType === "body"
        ? req.body
        : inputType === "params"
          ? req.params
          : req.query;

    const result = schema.safeParse(input);

    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
        code: err.code,
      }));

      return ResponseUtil.errorResponse(
        res,
        StatusCodes.BAD_REQUEST,
        "Validation failed",
        errorMessages
      );
    }

    next();
  };
}

export default zValidator;
