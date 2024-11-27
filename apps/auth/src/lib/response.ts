import { Response } from "express";
class ResponseUtil {
  static successResponse(
    res: Response,
    status: number,
    message: string,
    data: any = null
  ) {
    const response = {
      success: true,
      status,
      message,
      data,
    };

    res.status(status).json(response);
  }

  static errorResponse(
    res: Response,
    status: number,
    message: string,
    error: any = {}
  ) {
    const response = {
      success: false,
      status,
      message: message || "An error occurred",
      error,
    };

    res.status(status).json(response);
  }
}

export default ResponseUtil;
