import { Document } from "mongoose";
import { AttendanceSchema } from "@repo/validations/attendance";
import { z } from "zod";
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
export type AttendanceCreation = z.infer<typeof AttendanceSchema>;

export interface IAttendanceRecord {
  officeId: string; // Required office ID in each attendance record
  employeeId: string; // Required employee ID in each attendance record
  checkInTime: Date | null; // Check-in time (nullable)
  checkOutTime: Date | null; // Check-out time (nullable)
  status: AttendanceStatus; // Attendance status
  checkInMode: CheckInMode; // Mode of check-in
  isLate: boolean; // Whether the employee was late
}

export interface IHistoricalAttendance {
  date: Date; // The date for the historical attendance record
  attendance: IAttendanceRecord[]; // Array of attendance records for that day
}

export type IHistoricalAttendanceRepositoryType = Omit<
  IHistoricalAttendance,
  "_id"
>;

export interface IHistoricalAttendanceDocument
  extends IHistoricalAttendance,
    Document {}
