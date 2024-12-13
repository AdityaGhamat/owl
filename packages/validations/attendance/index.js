"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAttendanceSchema = exports.AttendanceSchema = void 0;
const zod_1 = require("zod");
const AttendanceSchema = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    employeeId: zod_1.z.string(),
    date: zod_1.z.string().datetime({
        offset: true,
    }),
    status: zod_1.z.enum(["PRESENT", "ABSENT", "ON_LEAVE", "EXCUSED"]),
    checkInMode: zod_1.z.enum(["MANUAL", "AUTOMATIC"]),
});
exports.AttendanceSchema = AttendanceSchema;
const updateAttendanceSchema = AttendanceSchema.partial();
exports.updateAttendanceSchema = updateAttendanceSchema;
