import { PrismaClient, Attendance } from "@prisma/client";
import {
  CreateAttendanceData,
  UpdateAttendanceData,
} from "../types/repository.js";

const prisma = new PrismaClient();

class AttendanceRepository {
  async createAttendance(data: CreateAttendanceData): Promise<Attendance> {
    try {
      const newAttendance = await prisma.attendance.create({
        data: {
          employeeId: data.employeeId,
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
}

export default new AttendanceRepository();
