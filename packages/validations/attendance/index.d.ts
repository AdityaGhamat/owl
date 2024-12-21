import { z } from "zod";
declare const AttendanceSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    employeeId: z.ZodString;
    date: z.ZodString;
    status: z.ZodEnum<["PRESENT", "ABSENT", "ON_LEAVE", "EXCUSED"]>;
    checkInMode: z.ZodEnum<["MANUAL", "AUTOMATIC"]>;
}, "strip", z.ZodTypeAny, {
    employeeId: string;
    date: string;
    status: "PRESENT" | "ABSENT" | "ON_LEAVE" | "EXCUSED";
    checkInMode: "MANUAL" | "AUTOMATIC";
    id?: string | undefined;
}, {
    employeeId: string;
    date: string;
    status: "PRESENT" | "ABSENT" | "ON_LEAVE" | "EXCUSED";
    checkInMode: "MANUAL" | "AUTOMATIC";
    id?: string | undefined;
}>;
declare const membersSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    role: z.ZodEnum<["Employee", "Manager", "Admin"]>;
    twoFactorEnabled: z.ZodBoolean;
    isDeleted: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    email: string;
    role: "Employee" | "Manager" | "Admin";
    twoFactorEnabled: boolean;
    isDeleted: boolean;
}, {
    id: string;
    name: string;
    email: string;
    role: "Employee" | "Manager" | "Admin";
    twoFactorEnabled: boolean;
    isDeleted: boolean;
}>;
declare const members: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    role: z.ZodEnum<["Employee", "Manager", "Admin"]>;
    twoFactorEnabled: z.ZodBoolean;
    isDeleted: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    email: string;
    role: "Employee" | "Manager" | "Admin";
    twoFactorEnabled: boolean;
    isDeleted: boolean;
}, {
    id: string;
    name: string;
    email: string;
    role: "Employee" | "Manager" | "Admin";
    twoFactorEnabled: boolean;
    isDeleted: boolean;
}>, "many">;
declare const updateAttendanceSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    employeeId: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["PRESENT", "ABSENT", "ON_LEAVE", "EXCUSED"]>>;
    checkInMode: z.ZodOptional<z.ZodEnum<["MANUAL", "AUTOMATIC"]>>;
}, "strip", z.ZodTypeAny, {
    id?: string | undefined;
    employeeId?: string | undefined;
    date?: string | undefined;
    status?: "PRESENT" | "ABSENT" | "ON_LEAVE" | "EXCUSED" | undefined;
    checkInMode?: "MANUAL" | "AUTOMATIC" | undefined;
}, {
    id?: string | undefined;
    employeeId?: string | undefined;
    date?: string | undefined;
    status?: "PRESENT" | "ABSENT" | "ON_LEAVE" | "EXCUSED" | undefined;
    checkInMode?: "MANUAL" | "AUTOMATIC" | undefined;
}>;
export { AttendanceSchema, updateAttendanceSchema, members, membersSchema };
declare const AttendanceStatusEnum: z.ZodEnum<["PRESENT", "ABSENT", "ON_LEAVE", "EXCUSED"]>;
declare const CheckInModeEnum: z.ZodEnum<["MANUAL", "AUTOMATIC"]>;
declare const AttendanceRecordSchema: z.ZodObject<{
    checkInTime: z.ZodDate;
    checkOutTime: z.ZodDate;
    status: z.ZodEnum<["PRESENT", "ABSENT", "ON_LEAVE", "EXCUSED"]>;
    checkInMode: z.ZodEnum<["MANUAL", "AUTOMATIC"]>;
    isLate: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    status: "PRESENT" | "ABSENT" | "ON_LEAVE" | "EXCUSED";
    checkInMode: "MANUAL" | "AUTOMATIC";
    checkInTime: Date;
    checkOutTime: Date;
    isLate: boolean;
}, {
    status: "PRESENT" | "ABSENT" | "ON_LEAVE" | "EXCUSED";
    checkInMode: "MANUAL" | "AUTOMATIC";
    checkInTime: Date;
    checkOutTime: Date;
    isLate?: boolean | undefined;
}>;
declare const HistoricalAttendanceSchema: z.ZodObject<{
    employeeId: z.ZodString;
    date: z.ZodDate;
    attendance: z.ZodArray<z.ZodObject<{
        checkInTime: z.ZodDate;
        checkOutTime: z.ZodDate;
        status: z.ZodEnum<["PRESENT", "ABSENT", "ON_LEAVE", "EXCUSED"]>;
        checkInMode: z.ZodEnum<["MANUAL", "AUTOMATIC"]>;
        isLate: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        status: "PRESENT" | "ABSENT" | "ON_LEAVE" | "EXCUSED";
        checkInMode: "MANUAL" | "AUTOMATIC";
        checkInTime: Date;
        checkOutTime: Date;
        isLate: boolean;
    }, {
        status: "PRESENT" | "ABSENT" | "ON_LEAVE" | "EXCUSED";
        checkInMode: "MANUAL" | "AUTOMATIC";
        checkInTime: Date;
        checkOutTime: Date;
        isLate?: boolean | undefined;
    }>, "atleastone">;
}, "strip", z.ZodTypeAny, {
    employeeId: string;
    date: Date;
    attendance: [{
        status: "PRESENT" | "ABSENT" | "ON_LEAVE" | "EXCUSED";
        checkInMode: "MANUAL" | "AUTOMATIC";
        checkInTime: Date;
        checkOutTime: Date;
        isLate: boolean;
    }, ...{
        status: "PRESENT" | "ABSENT" | "ON_LEAVE" | "EXCUSED";
        checkInMode: "MANUAL" | "AUTOMATIC";
        checkInTime: Date;
        checkOutTime: Date;
        isLate: boolean;
    }[]];
}, {
    employeeId: string;
    date: Date;
    attendance: [{
        status: "PRESENT" | "ABSENT" | "ON_LEAVE" | "EXCUSED";
        checkInMode: "MANUAL" | "AUTOMATIC";
        checkInTime: Date;
        checkOutTime: Date;
        isLate?: boolean | undefined;
    }, ...{
        status: "PRESENT" | "ABSENT" | "ON_LEAVE" | "EXCUSED";
        checkInMode: "MANUAL" | "AUTOMATIC";
        checkInTime: Date;
        checkOutTime: Date;
        isLate?: boolean | undefined;
    }[]];
}>;
export { AttendanceStatusEnum, CheckInModeEnum, AttendanceRecordSchema, HistoricalAttendanceSchema, };
//# sourceMappingURL=index.d.ts.map