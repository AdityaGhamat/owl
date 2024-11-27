import { StatusCodes } from "http-status-codes";
import HttpException from "./Exception.js";

export default class ForbiddenException extends HttpException {
  constructor(message = "Access forbidden", errorDetails?: object) {
    super(StatusCodes.FORBIDDEN, message, errorDetails);
    this.status = StatusCodes.FORBIDDEN;
  }
}
