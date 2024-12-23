import { PrismaClient, Attendance } from "@prisma/client";
import {
  CreateAttendanceData,
  UpdateAttendanceData,
} from "../types/repository.js";
import { HTTPException } from "hono/http-exception";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

class AttendanceRepository {
  async createAttendance(data: CreateAttendanceData): Promise<Attendance> {
    try {
      const newAttendance = await prisma.attendance.create({
        data: {
          employeeId: data.employeeId,
          officeId: data.officeId,
          date: new Date(),
          checkInTime: data.checkInTime || new Date(),
          status: data.status,
          checkInMode: data.checkInMode,
          isLate: data.isLate || false,
        },
      });
      return newAttendance;
    } catch (error: any) {
      throw error;
    }
  }

  async updateAttendance(
    attendanceId: string,
    updateData: UpdateAttendanceData
  ): Promise<Attendance> {
    try {
      const updatedAttendance = await prisma.attendance.update({
        where: {
          id: attendanceId,
        },
        data: updateData,
      });
      return updatedAttendance;
    } catch (error: any) {
      throw error;
    }
  }

  async getAllAttendance(): Promise<Attendance[]> {
    try {
      const response = await prisma.attendance.findMany();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async getAttendanceByEmployeeId(employeeId: string): Promise<Attendance[]> {
    try {
      const attendanceRecords = await prisma.attendance.findMany({
        where: {
          employeeId,
        },
        orderBy: {
          date: "desc",
        },
      });
      return attendanceRecords;
    } catch (error: any) {
      throw error;
    }
  }

  async getAttendanceByDate(date: Date): Promise<Attendance[]> {
    try {
      const attendanceRecords = await prisma.attendance.findMany({
        where: {
          date,
        },
      });
      return attendanceRecords;
    } catch (error: any) {
      throw error;
    }
  }
  async getAttendanceByAttendanceId(attendanceId: string): Promise<any> {
    const attendance = await prisma.attendance.findFirst({
      where: {
        id: attendanceId,
      },
    });
    if (!attendance) {
      throw new HTTPException(StatusCodes.NOT_FOUND, {
        message: "Attendance not found",
      });
    }
    return attendance;
  }
  async getAttendanceByEmployeeAndDate(
    employeeId: string,
    date: Date
  ): Promise<Attendance | null> {
    try {
      const attendanceRecord = await prisma.attendance.findFirst({
        where: {
          employeeId,
          date,
        },
      });
      return attendanceRecord;
    } catch (error: any) {
      throw error;
    }
  }
  async deleteAttendnaceByAttendanceId(attendanceId: string): Promise<boolean> {
    try {
      await prisma.attendance.delete({
        where: {
          id: attendanceId,
        },
      });
      return true;
    } catch (error) {
      throw error;
    }
  }
  async lateAttendanceByEmployeeId(employeeId: string): Promise<number> {
    try {
      const response = await prisma.attendance.updateMany({
        where: {
          employeeId: employeeId,
        },
        data: {
          isLate: true,
        },
      });
      if (response.count == 0) {
        throw new HTTPException(StatusCodes.BAD_REQUEST, {
          message: "Failed to update isLate status",
        });
      }
      const count = response.count;
      return count;
    } catch (error) {
      throw error;
    }
  }
}

export default new AttendanceRepository();
