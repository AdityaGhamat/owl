import { z } from "zod";

const AttendanceSchema = z.object({
  id: z.string().uuid().optional(),
  employeeId: z.string(),
  date: z.string().datetime({
    offset: true,
  }),
  status: z.enum(["PRESENT", "ABSENT", "ON_LEAVE", "EXCUSED"]),
  checkInMode: z.enum(["MANUAL", "AUTOMATIC"]),
});

const updateAttendanceSchema = AttendanceSchema.partial();

export { AttendanceSchema, updateAttendanceSchema };
