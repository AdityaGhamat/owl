import { HTTPException } from "hono/http-exception";
import attendanceAnalyticsRepository from "../repository/attendance-analytics-repository.js";
import { AttendanceAnalyticsCreationType } from "../types/database.js";
import { StatusCodes } from "http-status-codes";
import { attendanceDate, avgType } from "../types/services.js";

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
      avgCheckInTimeNumber += (record.avgCheckInTime ?? 0) as number;
      avgCheckOutTimeNumber += (record.avgCheckOutTime ?? 0) as number;
      avgLatePercentageNumber += (record.avgLatePercentage ?? 0) as number;
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
    const formattedRecords = records.map((record) => ({
      ...record,
      avgCheckInTime: record.avgCheckInTime ?? undefined,
      avgCheckOutTime: record.avgCheckOutTime ?? undefined,
      avgLatePercentage: record.avgLatePercentage ?? undefined,
    }));
    const {
      overallAvgCheckInTime,
      overallAvgCheckOutTime,
      overallAvgLatePercentage,
    } = this.findAverage(formattedRecords);
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
    const formattedRecords = records.map((record) => ({
      ...record,
      avgCheckInTime: record.avgCheckInTime ?? undefined,
      avgCheckOutTime: record.avgCheckOutTime ?? undefined,
      avgLatePercentage: record.avgLatePercentage ?? undefined,
    }));
    const {
      overallAvgCheckInTime,
      overallAvgCheckOutTime,
      overallAvgLatePercentage,
    } = this.findAverage(formattedRecords);
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
  public async getAverageByOfficeId(officeId: string, date: Date) {
    if (!officeId) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: "Office Id is required",
      });
    }
    const avg = await this.getAvgAnalyticsByOfficeId(officeId, date);
    return avg;
  }
  public async getAverageById(id: string, date: Date) {
    if (!(id && date)) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: "Analytics Id is required",
      });
    }
    const avg = await this.getAvgAnalyticsWithId(id, date);
    return avg;
  }
}

export default new AttendanceAnalyticsService();
