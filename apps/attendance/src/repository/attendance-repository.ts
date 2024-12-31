import { PrismaClient, Attendance } from "@prisma/client";
import { UpdateAttendanceData } from "../types/repository.js";
import { HTTPException } from "hono/http-exception";
import { StatusCodes } from "http-status-codes";
import { AttendanceCreation } from "../types/database.js";
import officeLibService from "../lib/service/office-lib-service.js";
const prisma = new PrismaClient();

class AttendanceRepository {
  async createAttendance(data: AttendanceCreation) {
    try {
      const newAttendance = await prisma.attendance.create({
        data: data,
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
  ///////////////////////////////////////come here after updating officestart and end hours.
  async updateAttendanceForCheckIn(
    employeeId: string,
    officeId: string,
    officestartHour: any
  ) {
    try {
      const currentDate = new Date();
      const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));

      const updatedAttendance = await prisma.attendance.updateMany({
        where: {
          employeeId: employeeId,
          officeId: officeId,
          date: {
            gte: startOfDay,
            lte: endOfDay,
          },
          checkInTime: null,
        },
        data: {
          checkInTime: new Date(),
          status: "PRESENT",
          checkInMode: "AUTOMATIC",
        },
      });

      if (updatedAttendance.count === 0) {
        throw new Error("No attendance record found for the user today");
      }

      return { success: true, message: "Attendance updated successfully" };
    } catch (error) {
      throw error;
    }
  }
  ///////////////////////////////////////come here after updating officestart and end hours.

  async updateAttendanceForCheckOut(employeeId: string, officeId: string) {
    const currentDate = new Date();
    const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));

    const attendanceRecord = await prisma.attendance.findFirst({
      where: {
        employeeId: employeeId,
        officeId: officeId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        checkOutTime: null,
      },
    });
    if (!attendanceRecord) {
      throw new HTTPException(StatusCodes.NOT_FOUND, {
        message:
          "No attendance record found for the user today, or already checked out.",
      });
    }
    const employeeCheck = await officeLibService.presentCheck(
      officeId,
      employeeId
    );
    if (employeeCheck) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: "Employee is currently present in office.",
      });
    }

    const updatedAttendance = await prisma.attendance.updateMany({
      where: {
        employeeId: employeeId,
        officeId: officeId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        checkOutTime: null,
      },
      data: {
        checkOutTime: new Date(),
      },
    });
    if (updatedAttendance.count === 0) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: "Failed to checkout.",
      });
    }
    return updatedAttendance.count;
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
          date: {
            equals: date,
          },
        },
      });
      return attendanceRecord;
    } catch (error: any) {
      throw error;
    }
  }
  async getAttendanceByOfficeId(
    officeId: string
  ): Promise<Attendance[] | null> {
    try {
      const attendance = await prisma.attendance.findMany({
        where: {
          officeId: officeId,
        },
      });
      return attendance;
    } catch (error) {
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
