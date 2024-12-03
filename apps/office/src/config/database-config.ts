import { HTTPException } from "hono/http-exception";
import mongoose from "mongoose";
import serverConfig from "./server-config.js";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../lib/error-response.js";

export async function databaseConnection() {
  if (!serverConfig.DATABASE_URL) {
    console.error("DATABASE_URL is not defined");
    ErrorResponse(StatusCodes.BAD_REQUEST, {}, "DATABASE_URL is not defined");
  }
  try {
    const connection = await mongoose.connect(serverConfig.DATABASE_URL!);
    console.log(`Server is connected with the database`);
  } catch (error) {
    console.error("Database connection failed:", error);
    ErrorResponse(
      StatusCodes.INTERNAL_SERVER_ERROR,
      {},
      "DATABASE_URL is not defined"
    );
  }
}
