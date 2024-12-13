import {
  AttendanceSchema,
  updateAttendanceSchema,
} from "@repo/validations/attendance";
import { z } from "zod";
export type AttendanceCreation = z.infer<typeof AttendanceSchema>;
export type updateAttendanceType = z.infer<typeof updateAttendanceSchema>;
