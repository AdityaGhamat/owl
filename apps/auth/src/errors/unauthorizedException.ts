import { StatusCodes } from "http-status-codes";
import HttpException from "./Exception.js";

class UnauthorizedException extends HttpException {
  constructor(message = "Unauthorized access", errorDetails?: object) {
    super(StatusCodes.UNAUTHORIZED, message, errorDetails);
    this.status = StatusCodes.UNAUTHORIZED;
  }
}
export default UnauthorizedException;
