import { AttendanceAnalyticsCreationType } from "../types/database.js";
import CrudRepository from "./crud-repository.js";
import prisma from "../config/prisma-config.js";
import { attendanceDate } from "../types/services.js";
class AttendanceAnalyticsRepository extends CrudRepository<
  AttendanceAnalyticsCreationType,
  string
> {
  constructor() {
    super(prisma, prisma.attendanceAnalytics);
  }

  public async findAttendanceByDate(officeId: string, data: attendanceDate) {
    const response = await this.prisma.attendanceAnalytics.findMany({
      where: {
        officeId: officeId,
        attendanceDate: data.attendanceDate,
      },
    });
    return response;
  }
  public async findAllAttendanceWithOfficeId(officeId: string) {
    const response = await this.prisma.attendanceAnalytics.findMany({
      where: {
        officeId: officeId,
      },
    });
    return response;
  }
  public async findAllAttendanceWithId(id: string) {
    const response = await this.prisma.attendanceAnalytics.findMany({
      where: {
        id: id,
      },
    });
    return response;
  }
  public async avgTimesOfOfficeWithId(
    id: string,
    avgCheckInTime: any,
    avgCheckOutTime: any,
    avgLatePercentage: any
  ) {
    const response = await this.prisma.attendanceAnalytics.updateMany({
      where: {
        id: id,
      },
      data: {
        avgCheckInTime: avgCheckInTime,
        avgCheckOutTime: avgCheckOutTime,
        avgLatePercentage: avgLatePercentage,
      },
    });
    return response;
  }
  public async avgTimesOfOfficeWithOfficeId(
    officeId: string,
    avgCheckInTime: any,
    avgCheckOutTime: any,
    avgLatePercentage: any
  ) {
    const response = await this.prisma.attendanceAnalytics.updateMany({
      where: {
        officeId: officeId,
      },
      data: {
        avgCheckInTime: avgCheckInTime,
        avgCheckOutTime: avgCheckOutTime,
        avgLatePercentage: avgLatePercentage,
      },
    });
    return response;
  }
  public async getAvgTimesWithOfficeId(officeId: string, date: Date) {
    const response = await this.prisma.attendanceAnalytics.findFirst({
      where: {
        officeId: officeId,
        attendanceDate: date,
      },
      select: {
        avgCheckInTime: true,
        avgCheckOutTime: true,
        avgLatePercentage: true,
      },
    });
    return response;
  }
  public async getAvgTimesWithId(id: string, date: Date) {
    const response = await this.prisma.attendanceAnalytics.findFirst({
      where: {
        id: id,
        attendanceDate: date,
      },
      select: {
        avgCheckInTime: true,
        avgCheckOutTime: true,
        avgLatePercentage: true,
      },
    });
    return response;
  }
}

export default new AttendanceAnalyticsRepository();
