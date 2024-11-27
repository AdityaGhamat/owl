import { StatusCodes } from "http-status-codes";
import HttpException from "./Exception.js";

export default class InternalServerErrorException extends HttpException {
  constructor(message = "Internal server error", errorDetails?: object) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message, errorDetails);
    this.status = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}
