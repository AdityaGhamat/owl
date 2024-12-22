import { Document } from "mongoose";
export enum AttendanceStatus {
  PRESENT = "PRESENT",
  ABSENT = "ABSENT",
  ON_LEAVE = "ON_LEAVE",
  EXCUSED = "EXCUSED",
}

export enum CheckInMode {
  MANUAL = "MANUAL",
  AUTOMATIC = "AUTOMATIC",
}

export interface IAttendanceRecord {
  checkInTime: Date;
  checkOutTime: Date;
  status: AttendanceStatus;
  checkInMode: CheckInMode;
  isLate: boolean;
}

export interface IHistoricalAttendance {
  employeeId: string;
  date: Date;
  attendance: IAttendanceRecord[];
}

export type IHistoricalAttendanceRepositoryType = Omit<
  IHistoricalAttendance,
  "_id"
>;
