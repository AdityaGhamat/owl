import { AttendanceStatus, CheckInMode } from "@prisma/client";

export interface CreateAttendanceData {
  employeeId: string;
  status: AttendanceStatus;
  checkInMode: CheckInMode;
  checkInTime?: Date;
  checkOutTime?: Date;
  isLate?: boolean;
}

export interface UpdateAttendanceData {
  checkOutTime?: Date;
  status?: AttendanceStatus;
  isLate?: boolean;
}
