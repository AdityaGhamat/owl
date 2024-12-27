import { z } from "zod";
declare const AttendanceAnalyticsCreation: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    attendanceDate: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, Date, string>;
    officeId: z.ZodString;
    totalEmployees: z.ZodNumber;
    employeeCountByStatus: z.ZodAny;
    avgCheckInTime: z.ZodOptional<z.ZodNumber>;
    avgCheckOutTime: z.ZodOptional<z.ZodNumber>;
    avgLatePercentage: z.ZodOptional<z.ZodNumber>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    attendanceDate: Date;
    officeId: string;
    totalEmployees: number;
    id?: string | undefined;
    employeeCountByStatus?: any;
    avgCheckInTime?: number | undefined;
    avgCheckOutTime?: number | undefined;
    avgLatePercentage?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}, {
    attendanceDate: string;
    officeId: string;
    totalEmployees: number;
    id?: string | undefined;
    employeeCountByStatus?: any;
    avgCheckInTime?: number | undefined;
    avgCheckOutTime?: number | undefined;
    avgLatePercentage?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}>;
declare const EmployeeAnalyticsCreation: z.ZodObject<{
    id: z.ZodString;
    employeeId: z.ZodString;
    officeId: z.ZodString;
    totalDaysPresent: z.ZodNumber;
    totalDaysAbsent: z.ZodNumber;
    totalDaysOnLeave: z.ZodNumber;
    lateCount: z.ZodNumber;
    avgCheckInTime: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    avgCheckOutTime: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    createdAt: z.ZodDefault<z.ZodOptional<z.ZodDate>>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    id: string;
    officeId: string;
    createdAt: Date;
    employeeId: string;
    totalDaysPresent: number;
    totalDaysAbsent: number;
    totalDaysOnLeave: number;
    lateCount: number;
    avgCheckInTime?: number | null | undefined;
    avgCheckOutTime?: number | null | undefined;
    updatedAt?: Date | undefined;
}, {
    id: string;
    officeId: string;
    employeeId: string;
    totalDaysPresent: number;
    totalDaysAbsent: number;
    totalDaysOnLeave: number;
    lateCount: number;
    avgCheckInTime?: number | null | undefined;
    avgCheckOutTime?: number | null | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}>;
declare const OfficeAnalyticsCreation: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    officeId: z.ZodString;
    attendanceDate: z.ZodEffects<z.ZodDate, Date, Date>;
    totalEmployeesPresent: z.ZodNumber;
    totalEmployeesAbsent: z.ZodNumber;
    totalEmployeesOnLeave: z.ZodNumber;
    avgEmployeesLate: z.ZodOptional<z.ZodNumber>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    attendanceDate: Date;
    officeId: string;
    totalEmployeesPresent: number;
    totalEmployeesAbsent: number;
    totalEmployeesOnLeave: number;
    id?: string | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    avgEmployeesLate?: number | undefined;
}, {
    attendanceDate: Date;
    officeId: string;
    totalEmployeesPresent: number;
    totalEmployeesAbsent: number;
    totalEmployeesOnLeave: number;
    id?: string | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    avgEmployeesLate?: number | undefined;
}>;
export { AttendanceAnalyticsCreation, EmployeeAnalyticsCreation, OfficeAnalyticsCreation, };
//# sourceMappingURL=index.d.ts.map