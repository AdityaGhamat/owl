import HttpException from "./Exception.js";

class ConflictException extends HttpException {
  constructor(message: string, errorDetails?: object) {
    super(409, message, errorDetails);
    this.status = 409;
  }
}

export default ConflictException;
