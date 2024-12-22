import attendanceService from "./attendance-service.js";
import {
  IAttendanceRecord,
  CheckInMode,
  AttendanceStatus,
  IHistoricalAttendanceRepositoryType,
} from "../types/database.js";
import attendanceHistoryRepository from "../repository/attendance-history-repository.js";

class AttendanceJob {
  private attendance: typeof attendanceService;
  constructor() {
    this.attendance = attendanceService;
  }
  public async transfer() {
    try {
      const attendanceRecords = await this.attendance.getAllAttendance();
      const groupedAttendance: { [date: string]: IAttendanceRecord[] } = {};
      attendanceRecords.forEach((record) => {
        const {
          date,
          checkInTime,
          checkOutTime,
          status,
          checkInMode,
          isLate,
          officeId,
          employeeId,
        } = record;

        const dateKey = new Date(date).toISOString().split("T")[0]; // YYYY-MM-DD

        if (!groupedAttendance[dateKey as string]) {
          groupedAttendance[dateKey as string] = [];
        }

        groupedAttendance[dateKey as string]?.push({
          officeId: officeId as string,
          employeeId: employeeId as string,
          checkInTime: checkInTime ?? null,
          checkOutTime: checkOutTime ?? null,
          status: status as AttendanceStatus,
          checkInMode: checkInMode as CheckInMode,
          isLate,
        });

        console.log(
          `Updated groupedAttendance[${dateKey}]:`,
          groupedAttendance[dateKey as string]
        );
      });

      for (const [dateKey, attendanceRecords] of Object.entries(
        groupedAttendance
      )) {
        const historicalAttendanceData: IHistoricalAttendanceRepositoryType = {
          date: new Date(dateKey),
          attendance: attendanceRecords.map((record) => ({
            checkInTime: record.checkInTime,
            checkOutTime: record.checkOutTime,
            status: record.status,
            checkInMode: record.checkInMode,
            isLate: record.isLate,
            officeId: record.officeId,
            employeeId: record.employeeId,
          })),
        };
        await attendanceHistoryRepository.create(historicalAttendanceData);
      }
    } catch (error) {
      console.error("Error transferring attendance:", error);
    }
  }
}

export default new AttendanceJob();
