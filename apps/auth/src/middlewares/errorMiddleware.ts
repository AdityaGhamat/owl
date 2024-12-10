import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import HttpException from "../errors/Exception.js";
import ResponseUtil from "../lib/response.js";
import { StatusCodes } from "http-status-codes";

function ErrorMiddleware(
  error: HttpException | ZodError | Error,
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
      StatusCodes.BAD_REQUEST,
      "Validation failed",
      errorMessages
    );
  }

  if (error instanceof HttpException) {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    const errorDetails = error.errorDetails || {};

    console.error(
      `[${new Date().toISOString()}] ${req.method} ${req.url} - ${message}`,
      {
        status,
        errorDetails,
      }
    );

    return ResponseUtil.errorResponse(res, status, message, errorDetails);
  }

  if (error instanceof Error) {
    if (
      error.message.includes("ECONNREFUSED") ||
      error.message.includes("ETIMEDOUT")
    ) {
      console.error(
        `[${new Date().toISOString()}] ${req.method} ${req.url} - Offline or Network Error: ${error.message}`
      );
      return ResponseUtil.errorResponse(
        res,
        503,
        "Service Unavailable - Network or Offline Error",
        {
          message: error.message,
        }
      );
    }
    console.error(
      `[${new Date().toISOString()}] ${req.method} ${req.url} - Unexpected error`,
      {
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined, // Optionally hide stack trace in production
      }
    );

    return ResponseUtil.errorResponse(res, 500, "Internal Server Error", {
      message: error.message,
    });
  }

  return ResponseUtil.errorResponse(res, 500, "Unknown error occurred", {});
}

export default ErrorMiddleware;
