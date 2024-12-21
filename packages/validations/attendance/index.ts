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

const membersSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["Employee", "Manager", "Admin"]),
  twoFactorEnabled: z.boolean(),
  isDeleted: z.boolean(),
});
const members = z.array(membersSchema);

const updateAttendanceSchema = AttendanceSchema.partial();

export { AttendanceSchema, updateAttendanceSchema, members, membersSchema };
