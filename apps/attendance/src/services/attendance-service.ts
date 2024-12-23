import { HTTPException } from "hono/http-exception";
import attendanceRepository from "../repository/attendance-repository.js";
import {
  AttendanceCreation,
  members,
  updateAttendanceType,
} from "../types/servcies.js";
import { StatusCodes } from "http-status-codes";
import AttendanceOfficeServices from "./attendance-office-services.js";

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
  async getAllAttendance() {
    const response = await attendanceRepository.getAllAttendance();
    if (!response) {
      throw new HTTPException(StatusCodes.NOT_FOUND, {
        message: "Attendance not found",
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
  async presentEmployees(members: members, officeId: string) {
    const officeServices = new AttendanceOfficeServices(officeId);
    const presentEmployees = await officeServices.isOfficeUserPresent(members);
    return presentEmployees;
  }
  async markAttendance(members: members, officeId: string) {
    const new_date = Date.now();
    const responses = await Promise.all(
      members.map((member) =>
        this.createAttendance({
          officeId: officeId,
          employeeId: member.id,
          date: new_date.toString(),
          status: "PRESENT",
          checkInMode: "AUTOMATIC",
        })
      )
    );
    if (!responses) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: "Failed to mark attendance",
      });
    }
    return true;
  }

  async deleteAttendance(attendanceId: string) {
    const response =
      await attendanceRepository.deleteAttendnaceByAttendanceId(attendanceId);
    if (!response) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: "Failed to delete attendance",
      });
    }
    return response;
  }
}

export default new AttedanceService();
