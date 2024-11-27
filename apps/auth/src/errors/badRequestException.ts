import { StatusCodes } from "http-status-codes";
import HttpException from "./Exception.js";

class BadRequestException extends HttpException {
  constructor(message: string, errorDetails?: object) {
    super(StatusCodes.BAD_REQUEST, message, errorDetails);
    this.status = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestException;
