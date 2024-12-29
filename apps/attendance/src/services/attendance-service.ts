import { HTTPException } from "hono/http-exception";
import attendanceRepository from "../repository/attendance-repository.js";
import {
  AttendanceCreation,
  members,
  updateAttendanceType,
} from "../types/services.js";
import { StatusCodes } from "http-status-codes";
import AttendanceOfficeServices from "./attendance-office-services.js";
import { AttendanceStatus, CheckInMode } from "@prisma/client";
import AuthService from "../lib/service/auth-lib-service.js";

class AttedanceService {
  async createAttendance(data: AttendanceCreation) {
    const response = await attendanceRepository.createAttendance({
      ...data,
      date: data.date ? new Date(data.date) : undefined,
      status: data.status,
      checkInMode: data.checkInMode,
    });

    if (!response) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: "Failed to create Attendance",
      });
    }
    return response;
  }
  async updateAttendance(id: string, data: updateAttendanceType) {
    const updateData = {
      ...data,
      date: data.date ? new Date(data.date) : undefined,
      status: data.status as AttendanceStatus,
      checkInMode: data.checkInMode as CheckInMode,
    };

    const response = await attendanceRepository.updateAttendance(
      id,
      updateData
    );
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
    const responses = await Promise.all(
      members.map((member) =>
        this.createAttendance({
          officeId: officeId,
          employeeId: member.id,
          isLate: false,
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
  async getAttendanceByOfficeId(officeId: string) {
    const response =
      await attendanceRepository.getAttendanceByOfficeId(officeId);
    if (!response) {
      throw new HTTPException(StatusCodes.NOT_FOUND, {
        message: "Failed to find attendance",
      });
    }
    return response;
  }
  private async getDistanceBetweenOfficeAndUser(
    office_id: string,
    employeeId: string
  ) {
    const response = new AuthService(office_id, employeeId);
    const distance = await response.calculateDistance();
    return distance;
  }
}

export default new AttedanceService();
