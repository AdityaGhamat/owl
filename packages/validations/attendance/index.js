"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoricalAttendanceSchema = exports.AttendanceRecordSchema = exports.CheckInModeEnum = exports.AttendanceStatusEnum = exports.CheckInMode = exports.AttendanceStatus = exports.membersSchema = exports.members = exports.updateAttendanceSchema = exports.AttendanceSchema = void 0;
const zod_1 = require("zod");
const AttendanceSchema = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    employeeId: zod_1.z.string(),
    officeId: zod_1.z.string(),
    date: zod_1.z.string().datetime({
        offset: true,
    }),
    status: zod_1.z.enum(["PRESENT", "ABSENT", "ON_LEAVE", "EXCUSED"]),
    checkInMode: zod_1.z.enum(["MANUAL", "AUTOMATIC"]),
});
exports.AttendanceSchema = AttendanceSchema;
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
const updateAttendanceSchema = AttendanceSchema.partial();
exports.updateAttendanceSchema = updateAttendanceSchema;
/////////////////////////////////////////////////////
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
const AttendanceStatusEnum = zod_1.z.nativeEnum(AttendanceStatus);
exports.AttendanceStatusEnum = AttendanceStatusEnum;
const CheckInModeEnum = zod_1.z.nativeEnum(CheckInMode);
exports.CheckInModeEnum = CheckInModeEnum;
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
const HistoricalAttendanceSchema = zod_1.z.object({
    date: zod_1.z.date({
        required_error: "Date is required",
    }),
    attendance: zod_1.z.array(AttendanceRecordSchema).nonempty({
        message: "Attendance records cannot be empty",
    }),
});
exports.HistoricalAttendanceSchema = HistoricalAttendanceSchema;
