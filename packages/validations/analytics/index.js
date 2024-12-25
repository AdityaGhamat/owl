"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfficeAnalyticsCreation = exports.EmployeeAnalyticsCreation = exports.AttendanceAnalyticsCreation = void 0;
const zod_1 = require("zod");
const AttendanceAnalyticsCreation = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    attendanceDate: zod_1.z.date(),
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
    id: zod_1.z.string().uuid().optional(),
    employeeId: zod_1.z.string(),
    officeId: zod_1.z.string(),
    totalDaysPresent: zod_1.z.number().int().optional(),
    totalDaysAbsent: zod_1.z.number().int().optional(),
    lateCount: zod_1.z.number().int().optional(),
    avgCheckInTime: zod_1.z.number().optional(),
    avgCheckOutTime: zod_1.z.number().optional(),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
exports.EmployeeAnalyticsCreation = EmployeeAnalyticsCreation;
const OfficeAnalyticsCreation = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    officeId: zod_1.z.string(),
    attendanceDate: zod_1.z.date(),
    totalEmployeesPresent: zod_1.z.number().int(),
    totalEmployeesAbsent: zod_1.z.number().int(),
    totalEmployeesOnLeave: zod_1.z.number().int(),
    avgEmployeesLate: zod_1.z.number().optional(),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
exports.OfficeAnalyticsCreation = OfficeAnalyticsCreation;
