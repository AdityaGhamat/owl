"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfficeAnalyticsCreation = exports.EmployeeAnalyticsCreation = exports.AttendanceAnalyticsCreation = void 0;
const zod_1 = require("zod");
const AttendanceAnalyticsCreation = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    attendanceDate: zod_1.z
        .string()
        .refine((value) => !isNaN(Date.parse(value)), {
        message: "Invalid date string",
    })
        .transform((value) => new Date(value)),
    officeId: zod_1.z.string(),
    totalEmployees: zod_1.z.number().int(),
    employeeCountByStatus: zod_1.z.any(),
    avgCheckInTime: zod_1.z.number().optional(),
    avgCheckOutTime: zod_1.z.number().optional(),
    avgLatePercentage: zod_1.z.number().optional(),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
exports.AttendanceAnalyticsCreation = AttendanceAnalyticsCreation;
const EmployeeAnalyticsCreation = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    employeeId: zod_1.z.string(),
    officeId: zod_1.z.string(),
    totalDaysPresent: zod_1.z.number().int().nonnegative(),
    totalDaysAbsent: zod_1.z.number().int().nonnegative(),
    totalDaysOnLeave: zod_1.z.number().int().nonnegative(),
    lateCount: zod_1.z.number().int().nonnegative(),
    avgCheckInTime: zod_1.z.number().optional().nullable(),
    avgCheckOutTime: zod_1.z.number().optional().nullable(),
    createdAt: zod_1.z.date().optional().default(new Date()),
    updatedAt: zod_1.z.date().optional(),
});
exports.EmployeeAnalyticsCreation = EmployeeAnalyticsCreation;
const OfficeAnalyticsCreation = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    officeId: zod_1.z.string(),
    attendanceDate: zod_1.z.date().transform((str) => new Date(str)),
    totalEmployeesPresent: zod_1.z.number().int(),
    totalEmployeesAbsent: zod_1.z.number().int(),
    totalEmployeesOnLeave: zod_1.z.number().int(),
    avgEmployeesLate: zod_1.z.number().optional(),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
exports.OfficeAnalyticsCreation = OfficeAnalyticsCreation;
