import {
  AttendanceSchema,
  members,
  membersSchema,
  updateAttendanceSchema,
} from "@repo/validations/attendance";
import { z } from "zod";
export type AttendanceCreation = z.infer<typeof AttendanceSchema>;
export type updateAttendanceType = z.infer<typeof updateAttendanceSchema>;
export type membersType = z.infer<typeof membersSchema>;
export type members = z.infer<typeof members>;
