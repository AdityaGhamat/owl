import { z } from "zod";

const AttendanceAnalyticsCreation = z.object({
  id: z.string().uuid().optional(),
  attendanceDate: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "Invalid date string",
    })
    .transform((value) => new Date(value)),
  officeId: z.string(),
  totalEmployees: z.number().int(),
  employeeCountByStatus: z.any(),
  avgCheckInTime: z.number().optional(),
  avgCheckOutTime: z.number().optional(),
  avgLatePercentage: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const EmployeeAnalyticsCreation = z.object({
  id: z.string().uuid().optional(),
  employeeId: z.string(),
  officeId: z.string(),
  totalDaysPresent: z.number().int().optional(),
  totalDaysAbsent: z.number().int().optional(),
  lateCount: z.number().int().optional(),
  avgCheckInTime: z.number().optional(),
  avgCheckOutTime: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const OfficeAnalyticsCreation = z.object({
  id: z.string().uuid().optional(),
  officeId: z.string(),
  attendanceDate: z.date().transform((str) => new Date(str)),
  totalEmployeesPresent: z.number().int(),
  totalEmployeesAbsent: z.number().int(),
  totalEmployeesOnLeave: z.number().int(),
  avgEmployeesLate: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export {
  AttendanceAnalyticsCreation,
  EmployeeAnalyticsCreation,
  OfficeAnalyticsCreation,
};
