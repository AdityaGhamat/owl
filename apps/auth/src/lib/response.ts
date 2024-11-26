class Response {
  constructor(message: string, data?: any, error?: any) {}

  static successResponse(message: string, data?: any) {
    return {
      success: true,
      message,
      data: data || null,
    };
  }

  static errorResponse(error: any, message?: string, statusCode?: number) {
    return {
      success: false,
      message: message || "An error occurred",
      error: error || {},
      statusCode: statusCode || 500,
    };
  }
}

export default Response;
