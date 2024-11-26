import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import logger from "../config/logger-config.js";
import { BaseError } from "./error-classes.js";
const errorMiddleware: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error(`[${req.method}] ${req.path} - ${err.message}`);
  if (err.stack) {
    logger.error(err.stack);
  }

  if (err instanceof BaseError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err.details || null,
      statusCode: err.statusCode,
    });
    return;
  }
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message || "Unexpected Error",
    statusCode: 500,
  });
};

export default errorMiddleware;
