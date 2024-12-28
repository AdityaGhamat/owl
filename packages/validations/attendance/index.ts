import { z } from "zod";

// Enums
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

// Zod Enums
const AttendanceStatusEnum = z.nativeEnum(AttendanceStatus);
const CheckInModeEnum = z.nativeEnum(CheckInMode);

// Attendance Schema
const AttendanceSchema = z.object({
  id: z.string().uuid().optional(),
  employeeId: z
    .string({
      required_error: "Employee ID is required",
    })
    .nonempty("Employee ID cannot be empty"),
  officeId: z.string({
    required_error: "Office ID is required",
  }),
  date: z
    .date({
      required_error: "Date is required",
    })
    .optional(),
  checkInTime: z.date().optional(),
  checkOutTime: z.date().optional(),
  status: AttendanceStatusEnum.optional(),
  checkInMode: CheckInModeEnum.optional(),
  isLate: z.boolean().default(false),
});

// Members Schema
const membersSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["Employee", "Manager", "Admin"]),
  twoFactorEnabled: z.boolean(),
  isDeleted: z.boolean(),
});

const members = z.array(membersSchema);

// Partial Attendance Schema for Updates
const updateAttendanceSchema = AttendanceSchema.partial();

// Attendance Record Schema
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
  officeId: z.string(),
  employeeId: z
    .string({
      required_error: "Employee ID is required",
    })
    .nonempty("Employee ID cannot be empty"),
});

// Historical Attendance Schema
const HistoricalAttendanceSchema = z.object({
  date: z.date({
    required_error: "Date is required",
  }),
  attendance: z.array(AttendanceRecordSchema).nonempty({
    message: "Attendance records cannot be empty",
  }),
});

// Exporting Schemas
export {
  AttendanceSchema,
  updateAttendanceSchema,
  members,
  membersSchema,
  AttendanceRecordSchema,
  HistoricalAttendanceSchema,
};
