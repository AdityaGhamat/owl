"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoricalAttendanceSchema = exports.AttendanceRecordSchema = exports.membersSchema = exports.members = exports.updateAttendanceSchema = exports.AttendanceSchema = exports.CheckInMode = exports.AttendanceStatus = void 0;
const zod_1 = require("zod");
// Enums
var AttendanceStatus;
(function (AttendanceStatus) {
    AttendanceStatus["PRESENT"] = "PRESENT";
    AttendanceStatus["ABSENT"] = "ABSENT";
    AttendanceStatus["ON_LEAVE"] = "ON_LEAVE";
    AttendanceStatus["EXCUSED"] = "EXCUSED";
})(AttendanceStatus = exports.AttendanceStatus || (exports.AttendanceStatus = {}));
var CheckInMode;
(function (CheckInMode) {
    CheckInMode["MANUAL"] = "MANUAL";
    CheckInMode["AUTOMATIC"] = "AUTOMATIC";
})(CheckInMode = exports.CheckInMode || (exports.CheckInMode = {}));
// Zod Enums
const AttendanceStatusEnum = zod_1.z.nativeEnum(AttendanceStatus);
const CheckInModeEnum = zod_1.z.nativeEnum(CheckInMode);
// Attendance Schema
const AttendanceSchema = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    employeeId: zod_1.z
        .string({
        required_error: "Employee ID is required",
    })
        .nonempty("Employee ID cannot be empty"),
    officeId: zod_1.z.string({
        required_error: "Office ID is required",
    }),
    date: zod_1.z
        .date({
        required_error: "Date is required",
    })
        .optional(),
    checkInTime: zod_1.z.date().optional(),
    checkOutTime: zod_1.z.date().optional(),
    status: AttendanceStatusEnum.optional(),
    checkInMode: CheckInModeEnum.optional(),
    isLate: zod_1.z.boolean().default(false),
});
exports.AttendanceSchema = AttendanceSchema;
// Members Schema
const membersSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    role: zod_1.z.enum(["Employee", "Manager", "Admin"]),
    twoFactorEnabled: zod_1.z.boolean(),
    isDeleted: zod_1.z.boolean(),
});
exports.membersSchema = membersSchema;
const members = zod_1.z.array(membersSchema);
exports.members = members;
// Partial Attendance Schema for Updates
const updateAttendanceSchema = AttendanceSchema.partial();
exports.updateAttendanceSchema = updateAttendanceSchema;
// Attendance Record Schema
const AttendanceRecordSchema = zod_1.z.object({
    checkInTime: zod_1.z.date({
        required_error: "Check-in time is required",
    }),
    checkOutTime: zod_1.z.date({
        required_error: "Check-out time is required",
    }),
    status: AttendanceStatusEnum,
    checkInMode: CheckInModeEnum,
    isLate: zod_1.z.boolean().default(false),
    officeId: zod_1.z.string(),
    employeeId: zod_1.z
        .string({
        required_error: "Employee ID is required",
    })
        .nonempty("Employee ID cannot be empty"),
});
exports.AttendanceRecordSchema = AttendanceRecordSchema;
// Historical Attendance Schema
const HistoricalAttendanceSchema = zod_1.z.object({
    date: zod_1.z.date({
        required_error: "Date is required",
    }),
    attendance: zod_1.z.array(AttendanceRecordSchema).nonempty({
        message: "Attendance records cannot be empty",
    }),
});
exports.HistoricalAttendanceSchema = HistoricalAttendanceSchema;
