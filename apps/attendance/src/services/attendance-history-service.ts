import { HTTPException } from "hono/http-exception";
import attendanceHistoryRepository from "../repository/attendance-history-repository.js";
import { StatusCodes } from "http-status-codes";
import { AttendanceHistoryCreation } from "../types/services.js";
class AttendanceHistoryService {
  public async create(data: AttendanceHistoryCreation) {
    const response = await attendanceHistoryRepository.create(data);
    if (!response) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: "Error while creating archive of attendance",
      });
    }
    return response;
  }
  public async find(args: {}, options?: Record<string, unknown>) {
    const response = await attendanceHistoryRepository.find(args, options);
    if (response.length === 0) {
      throw new HTTPException(StatusCodes.NOT_FOUND, {
        message: "Attendance record not found",
      });
    }
    return response;
  }
  public async findOne(args: {}, options?: Record<string, unknown>) {
    const response = await attendanceHistoryRepository.findOne(args, options);
    if (!response) {
      throw new HTTPException(StatusCodes.NOT_FOUND, {
        message: "Attendance record not found",
      });
    }
    return response;
  }
  public async findById(id: string, fields?: string[], options?: {}) {
    const response = await attendanceHistoryRepository.findById(
      id,
      fields,
      options
    );
    if (!response) {
      throw new HTTPException(StatusCodes.NOT_FOUND, {
        message: "Attendance record not found",
      });
    }
    return response;
  }
}

export default new AttendanceHistoryService();
