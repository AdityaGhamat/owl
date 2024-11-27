class HttpException extends Error {
  status: number;
  errorDetails: object;

  constructor(status: number, message: string, errorDetails: object = {}) {
    super(message);
    this.status = status;
    this.errorDetails = errorDetails;
  }
}

export default HttpException;
