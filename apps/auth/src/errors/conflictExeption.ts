import HttpException from "./Exception.js";

class ConflictException extends HttpException {
  constructor(message: string, errorDetails?: object) {
    super(409, message, errorDetails);
    this.status = 409;
    console.log(
      this.status +
        "This is inside conflict execption class you have to notice it"
    );
  }
}

export default ConflictException;
