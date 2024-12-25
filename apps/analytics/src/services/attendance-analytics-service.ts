import { HTTPException } from "hono/http-exception";
import attendanceAnalyticsRepository from "../repository/attendance-analytics-repository.js";
import { AttendanceAnalyticsCreationType } from "../types/database.js";
import { StatusCodes } from "http-status-codes";
import { attendanceDate, avgType } from "../types/services.js";
import { handle } from "hono/cloudflare-pages";

class AttendanceAnalyticsService {
  private attendance;
  constructor() {
    this.attendance = attendanceAnalyticsRepository;
  }
  private handleResponse<T>(response: T, errorMessage: string): T {
    if (!response) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: errorMessage,
      });
    }
    return response;
  }

  public async create(data: AttendanceAnalyticsCreationType) {
    const response = await this.attendance.create(data);
    return this.handleResponse(
      response,
      "Failed to create attendance analytics"
    );
  }
  public async findAnalytics(data: Partial<AttendanceAnalyticsCreationType>) {
    const response = await this.attendance.findFirst(data);
    return this.handleResponse(response, "Analytics not found");
  }
  public async findAnalyticsByDate(officeId: string, data: attendanceDate) {
    const response = await this.attendance.findAttendanceByDate(officeId, data);
    return this.handleResponse(response, "Analytics not found");
  }
  public async findAnalyticsWithId(id: string) {
    const response = await this.attendance.findUnique(id);
    return this.handleResponse(response, "Analytics not found");
  }
  private findAverage(records: AttendanceAnalyticsCreationType[]) {
    const length = records.length;
    let avgCheckInTimeNumber: number = 0;
    let avgCheckOutTimeNumber: number = 0;
    let avgLatePercentageNumber: number = 0;
    for (const record of records) {
      avgCheckInTimeNumber += record.avgCheckInTime as number;
      avgCheckOutTimeNumber += record.avgCheckOutTime as number;
      avgLatePercentageNumber += record.avgLatePercentage as number;
    }
    const overallAvgCheckInTime = avgCheckInTimeNumber / length;
    const overallAvgCheckOutTime = avgCheckOutTimeNumber / length;
    const overallAvgLatePercentage = avgLatePercentageNumber / length;

    return {
      overallAvgCheckInTime,
      overallAvgCheckOutTime,
      overallAvgLatePercentage,
    };
  }
  public async updateAvgWithOfficeId(officeId: string) {
    const records =
      await this.attendance.findAllAttendanceWithOfficeId(officeId);
    const {
      overallAvgCheckInTime,
      overallAvgCheckOutTime,
      overallAvgLatePercentage,
    } = this.findAverage(records);
    const response = await this.attendance.avgTimesOfOfficeWithOfficeId(
      officeId,
      overallAvgCheckInTime,
      overallAvgCheckOutTime,
      overallAvgLatePercentage
    );
    return this.handleResponse(response, "Failed to update averages");
  }

  public async updateAvgWithId(id: string) {
    const records = await this.attendance.findAllAttendanceWithId(id);
    const {
      overallAvgCheckInTime,
      overallAvgCheckOutTime,
      overallAvgLatePercentage,
    } = this.findAverage(records);
    const response = await this.attendance.avgTimesOfOfficeWithId(
      id,
      overallAvgCheckInTime,
      overallAvgCheckOutTime,
      overallAvgLatePercentage
    );
    return this.handleResponse(response, "Failed to update averages");
  }
  private async getAvgAnalyticsByOfficeId(officeId: string, date: Date) {
    const avg = await this.attendance.getAvgTimesWithOfficeId(officeId, date);
    const { avgCheckInTime, avgCheckOutTime, avgLatePercentage } =
      avg as avgType;
    if (!avg || !(avgCheckInTime && avgCheckOutTime && avgLatePercentage)) {
      throw new HTTPException(StatusCodes.NOT_FOUND, {
        message: "Avg not found",
      });
    }
    return avg;
  }
  private async getAvgAnalyticsWithId(id: string, date: Date) {
    const avg = await this.attendance.getAvgTimesWithId(id, date);
    const { avgCheckInTime, avgCheckOutTime, avgLatePercentage } =
      avg as avgType;
    if (!avg || !(avgCheckInTime && avgCheckOutTime && avgLatePercentage)) {
      throw new HTTPException(StatusCodes.NOT_FOUND, {
        message: "Avg not found",
      });
    }
    return avg;
  }
  public async getAllAverages(
    data: { officeId: string; id: string },
    date: Date
  ) {
    const { officeId, id } = data;
    if (!(officeId && id)) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: "Office Id or Analytics Id is required",
      });
    }
    if (officeId) {
      const avg = await this.getAvgAnalyticsByOfficeId(officeId, date);
      return avg;
    }
    const avg = await this.getAvgAnalyticsWithId(id, date);
    return avg;
  }
}

export default new AttendanceAnalyticsService();
