import { HTTPException } from "hono/http-exception";
import { StatusCodes } from "http-status-codes";
import officeAnalyticsRepository from "../repository/office-analytics-repository.js";
import { OfficeAnalyticsCreationType } from "../types/database.js";

class OfficeAnalyticsService {
  private handleResponse<T>(response: T, errorMessage: string): T {
    if (!response) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: errorMessage,
      });
    }
    return response;
  }
  public async create(data: Partial<OfficeAnalyticsCreationType>) {}
}
