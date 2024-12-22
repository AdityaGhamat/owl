import attendanceService from "./attendance-service.js";
import { IAttendanceRecord } from "../types/database.js";

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
        const { date, checkInTime, checkOutTime, status, checkInMode, isLate } =
          record;
        const dateKey = date.toISOString().split("T")[0]; // YYYY-MM-DD
        if (!groupedAttendance[dateKey as string]) {
          groupedAttendance[dateKey as string] = [];
        }
        // groupedAttendance[dateKey!].push({
        //   checkInTime: checkInTime ?? undefined,
        //   checkOutTime,
        //   status,
        //   checkInMode,
        //   isLate,
        // });
      });
    } catch (error) {}
  }
}
export default new AttendanceJob();

//implement with message queue
