import { AttendanceStatus, CheckInMode } from "@prisma/client";

export interface CreateAttendanceData {
  employeeId: string;
  status: AttendanceStatus;
  checkInMode: CheckInMode;
  checkInTime?: string;
  checkOutTime?: string;
  isLate?: boolean;
}

export interface UpdateAttendanceData {
  checkOutTime?: Date;
  status?: AttendanceStatus;
  isLate?: boolean;
}
