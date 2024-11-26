export class BaseError extends Error {
  public statusCode: number;
  public details?: any;
  constructor(message: string, statusCode: number, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ErrorHandler extends BaseError {
  constructor(message: string, statusCode: number, details?: any) {
    super(message, statusCode, details);
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string = "Bad Request", details?: any) {
    super(message, 400, details);
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string = "Not Found", details?: any) {
    super(message, 404, details);
  }
}

export class InternalServerError extends BaseError {
  constructor(message: string = "Internal Server Error", details?: any) {
    super(message, 500, details);
  }
}
