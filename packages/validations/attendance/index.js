"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.membersSchema = exports.members = exports.updateAttendanceSchema = exports.AttendanceSchema = void 0;
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
