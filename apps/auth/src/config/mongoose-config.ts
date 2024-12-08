import mongoose from "mongoose";
import serverConfig from "./server-config.js";
import HttpException from "../errors/Exception.js";
import { StatusCodes } from "http-status-codes";

async function databaseConnection() {
  try {
    if (!serverConfig.DATABASE_URL) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        "Database url is not provided"
      );
    }
    mongoose
      .connect(serverConfig.DATABASE_URL)
      .then(() => console.log("databse is connected"))
      .catch((e) => {
        throw new HttpException(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Failed to connect to database"
        );
      });
  } catch (error: any) {
    throw new HttpException(error.status, error.message);
  }
}

export default databaseConnection;
