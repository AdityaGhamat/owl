import {
  AttendanceSchema,
  members,
  membersSchema,
  updateAttendanceSchema,
  HistoricalAttendanceSchema,
} from "@repo/validations/attendance";
import { z } from "zod";
export type AttendanceHistoryCreation = z.infer<
  typeof HistoricalAttendanceSchema
>;
export interface AttendanceQueryArgs {
  employeeId?: string;
  date?: {
    $gte?: Date;
    $lte?: Date;
  };
}
export type updateAttendanceType = z.infer<typeof updateAttendanceSchema>;
export type membersType = z.infer<typeof membersSchema>;
export type members = z.infer<typeof members>;
export type AttendanceCreation = z.infer<typeof AttendanceSchema>;
