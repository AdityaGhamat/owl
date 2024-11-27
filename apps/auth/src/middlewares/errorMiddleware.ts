import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import HttpException from "../errors/Exception.js";
import ResponseUtil from "../lib/response.js";

function ErrorMiddleware(
  error: HttpException | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ZodError) {
    const errorMessages = error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
      code: err.code,
    }));

    return ResponseUtil.errorResponse(
      res,
      400, // Bad Request for validation issues
      "Validation failed",
      errorMessages
    );
  }

  if (error instanceof HttpException) {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    const errorDetails = error.errorDetails || {};

    console.log("Error middleware caught:", error);
    console.error(`[${req.method} ${req.url}]`, {
      status,
      message,
      errorDetails,
    });

    return ResponseUtil.errorResponse(res, status, message, errorDetails);
  }

  console.error("Unhandled error:", error);
  return ResponseUtil.errorResponse(res, 500, "Internal Server Error", {});
}

export default ErrorMiddleware;
