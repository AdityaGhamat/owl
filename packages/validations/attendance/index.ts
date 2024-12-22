import { z } from "zod";

const AttendanceSchema = z.object({
  id: z.string().uuid().optional(),
  employeeId: z.string(),
  officeId: z.string(),
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

/////////////////////////////////////////////////////
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
const AttendanceStatusEnum = z.nativeEnum(AttendanceStatus);
const CheckInModeEnum = z.nativeEnum(CheckInMode);

const AttendanceRecordSchema = z.object({
  checkInTime: z.date({
    required_error: "Check-in time is required",
  }),
  checkOutTime: z.date({
    required_error: "Check-out time is required",
  }),
  status: AttendanceStatusEnum,
  checkInMode: CheckInModeEnum,
  isLate: z.boolean().default(false),
});

const HistoricalAttendanceSchema = z.object({
  officeId: z.string(),
  employeeId: z
    .string({
      required_error: "Employee ID is required",
    })
    .nonempty("Employee ID cannot be empty"),
  date: z.date({
    required_error: "Date is required",
  }),
  attendance: z.array(AttendanceRecordSchema).nonempty({
    message: "Attendance records cannot be empty",
  }),
});

export {
  AttendanceStatusEnum,
  CheckInModeEnum,
  AttendanceRecordSchema,
  HistoricalAttendanceSchema,
};
