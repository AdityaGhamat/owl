import employeeAnalyticsRepository from "../repository/employee-analytics-repository.js";
import { EmployeeAnalyticsCreationType } from "../types/database.js";
import { HTTPException } from "hono/http-exception";
import { StatusCodes } from "http-status-codes";

class EmployeeAnalyticsServices {
  private handleResponse<T>(response: T, errorMessage: string): T {
    if (!response) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: errorMessage,
      });
    }
    return response;
  }
  public async create(data: EmployeeAnalyticsCreationType) {
    const response = await employeeAnalyticsRepository.create(data);
    return this.handleResponse(
      response,
      "Failed to create employee analytics."
    );
  }
  public async findFirst(
    args: Partial<EmployeeAnalyticsCreationType>
  ): Promise<EmployeeAnalyticsCreationType | null> {
    const response = await employeeAnalyticsRepository.findFirst(args);
    return this.handleResponse(response, "Employee not found.");
  }
  public async findMany(
    args: Partial<EmployeeAnalyticsCreationType>
  ): Promise<EmployeeAnalyticsCreationType[] | null> {
    const response = await employeeAnalyticsRepository.findMany(args);
    return this.handleResponse(response, "Employees not found.");
  }
  public async findUnique(
    id: string
  ): Promise<EmployeeAnalyticsCreationType | null> {
    const response = await employeeAnalyticsRepository.findUnique(id);
    return this.handleResponse(response, "Employee not found.");
  }
  public async updateAnalytics(
    id: string,
    data: Partial<EmployeeAnalyticsCreationType>
  ) {
    const response = await employeeAnalyticsRepository.update(id, data);
    return this.handleResponse(response, "Failed to update analytics.");
  }
  public async updateManyAnalytics(
    id: string,
    data: Partial<EmployeeAnalyticsCreationType>
  ) {
    const response = await employeeAnalyticsRepository.updateMany(id, data);
    return this.handleResponse(response, "Failed to update analytics.");
  }
  public async deleteAnalytics(id: string) {
    const response = await employeeAnalyticsRepository.delete(id);
    return this.handleResponse(response, "Failed to delete analytics.");
  }
  public async count(args: Partial<EmployeeAnalyticsCreationType>) {
    const response = await employeeAnalyticsRepository.count(args);
    return this.handleResponse(response, "response not found.");
  }
}

export default new EmployeeAnalyticsServices();
