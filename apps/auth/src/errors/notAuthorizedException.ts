import { StatusCodes } from "http-status-codes";
import HttpException from "./Exception.js";

export default class NotFoundException extends HttpException {
  constructor(message: string, errorDetails?: object) {
    super(StatusCodes.NOT_FOUND, message, errorDetails);
    this.status = StatusCodes.NOT_FOUND;
  }
}
