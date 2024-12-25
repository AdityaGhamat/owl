import { z } from "zod";
import { members } from "@repo/validations/attendance";
import { AttendanceAnalyticsCreationType } from "./database.js";
export type members = z.infer<typeof members>;

export type attendanceDate = Pick<
  AttendanceAnalyticsCreationType,
  "attendanceDate"
>;

export type avgType = Pick<
  AttendanceAnalyticsCreationType,
  "avgCheckInTime" | "avgCheckOutTime" | "avgLatePercentage"
>;
