import { HTTPException } from "hono/http-exception";
import attendanceRepository from "../repository/attendance-repository.js";
import { AttendanceCreation, updateAttendanceType } from "../types/servcies.js";
import { StatusCodes } from "http-status-codes";

class AttedanceService {
  async createAttendance(data: AttendanceCreation) {
    const response = await attendanceRepository.createAttendance(data);
    if (!response) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: "Failed to create Attendance",
      });
    }
    return response;
  }
  async updateAttendance(id: string, data: updateAttendanceType) {
    const response = await attendanceRepository.updateAttendance(id, data);
    if (!response) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: "Failed to update the attendance",
      });
    }
    return response;
  }
  async getAttendanceOfEmployee(employeeId: string) {
    const response =
      await attendanceRepository.getAttendanceByEmployeeId(employeeId);
    if (!response) {
      throw new HTTPException(StatusCodes.NOT_FOUND, {
        message: "Attendance not found",
      });
    }
    return response;
  }
  async getAttendanceByDate(date: Date) {
    const response = await attendanceRepository.getAttendanceByDate(date);
    if (!response) {
      throw new HTTPException(StatusCodes.NOT_FOUND, {
        message: "Attendance not found",
      });
    }
    return response;
  }
  async getAttendanceByEmployeeAndDate(employeeId: string, date: Date) {
    const response = await attendanceRepository.getAttendanceByEmployeeAndDate(
      employeeId,
      date
    );
    if (!response) {
      throw new HTTPException(StatusCodes.NOT_FOUND, {
        message: "Attendance not found",
      });
    }
    return response;
  }
}

export default new AttedanceService();
