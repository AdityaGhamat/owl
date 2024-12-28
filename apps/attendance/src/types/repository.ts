import { AttendanceStatus, CheckInMode } from "@prisma/client";
import { ICrudRepositoryOrganization } from "@repo/types/src/common.js";
import { IHistoricalAttendanceRepositoryType } from "../types/database.js";
export interface CreateAttendanceData {
  employeeId: string;
  officeId: string;
  status?: AttendanceStatus;
  checkInMode?: CheckInMode;
  checkInTime?: string;
  checkOutTime?: string;
  isLate?: boolean;
}

export interface UpdateAttendanceData {
  checkOutTime?: Date;
  status?: AttendanceStatus;
  isLate?: boolean;
}

export interface IAttendanceHistoryRepository
  extends ICrudRepositoryOrganization<IHistoricalAttendanceRepositoryType> {
  getAttendanceByDateRange(
    startDate: string,
    endDate: string
  ): Promise<IHistoricalAttendanceRepositoryType[]>;

  updateAttendanceStatus(
    id: string,
    status: string
  ): Promise<IHistoricalAttendanceRepositoryType | null>;

  generateReport(
    args: Partial<IHistoricalAttendanceRepositoryType>
  ): Promise<any>;
}
