import { z } from "zod";
declare const AttendanceSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    employeeId: z.ZodString;
    officeId: z.ZodString;
    date: z.ZodString;
    status: z.ZodEnum<["PRESENT", "ABSENT", "ON_LEAVE", "EXCUSED"]>;
    checkInMode: z.ZodEnum<["MANUAL", "AUTOMATIC"]>;
}, "strip", z.ZodTypeAny, {
    status: "PRESENT" | "ABSENT" | "ON_LEAVE" | "EXCUSED";
    date: string;
    officeId: string;
    employeeId: string;
    checkInMode: "MANUAL" | "AUTOMATIC";
    id?: string | undefined;
}, {
    status: "PRESENT" | "ABSENT" | "ON_LEAVE" | "EXCUSED";
    date: string;
    officeId: string;
    employeeId: string;
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
    officeId: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["PRESENT", "ABSENT", "ON_LEAVE", "EXCUSED"]>>;
    checkInMode: z.ZodOptional<z.ZodEnum<["MANUAL", "AUTOMATIC"]>>;
}, "strip", z.ZodTypeAny, {
    id?: string | undefined;
    status?: "PRESENT" | "ABSENT" | "ON_LEAVE" | "EXCUSED" | undefined;
    date?: string | undefined;
    officeId?: string | undefined;
    employeeId?: string | undefined;
    checkInMode?: "MANUAL" | "AUTOMATIC" | undefined;
}, {
    id?: string | undefined;
    status?: "PRESENT" | "ABSENT" | "ON_LEAVE" | "EXCUSED" | undefined;
    date?: string | undefined;
    officeId?: string | undefined;
    employeeId?: string | undefined;
    checkInMode?: "MANUAL" | "AUTOMATIC" | undefined;
}>;
export { AttendanceSchema, updateAttendanceSchema, members, membersSchema };
export declare enum AttendanceStatus {
    PRESENT = "PRESENT",
    ABSENT = "ABSENT",
    ON_LEAVE = "ON_LEAVE",
    EXCUSED = "EXCUSED"
}
export declare enum CheckInMode {
    MANUAL = "MANUAL",
    AUTOMATIC = "AUTOMATIC"
}
declare const AttendanceStatusEnum: z.ZodNativeEnum<typeof AttendanceStatus>;
declare const CheckInModeEnum: z.ZodNativeEnum<typeof CheckInMode>;
declare const AttendanceRecordSchema: z.ZodObject<{
    checkInTime: z.ZodDate;
    checkOutTime: z.ZodDate;
    status: z.ZodNativeEnum<typeof AttendanceStatus>;
    checkInMode: z.ZodNativeEnum<typeof CheckInMode>;
    isLate: z.ZodDefault<z.ZodBoolean>;
    officeId: z.ZodString;
    employeeId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: AttendanceStatus;
    officeId: string;
    employeeId: string;
    checkInMode: CheckInMode;
    checkInTime: Date;
    checkOutTime: Date;
    isLate: boolean;
}, {
    status: AttendanceStatus;
    officeId: string;
    employeeId: string;
    checkInMode: CheckInMode;
    checkInTime: Date;
    checkOutTime: Date;
    isLate?: boolean | undefined;
}>;
declare const HistoricalAttendanceSchema: z.ZodObject<{
    date: z.ZodDate;
    attendance: z.ZodArray<z.ZodObject<{
        checkInTime: z.ZodDate;
        checkOutTime: z.ZodDate;
        status: z.ZodNativeEnum<typeof AttendanceStatus>;
        checkInMode: z.ZodNativeEnum<typeof CheckInMode>;
        isLate: z.ZodDefault<z.ZodBoolean>;
        officeId: z.ZodString;
        employeeId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: AttendanceStatus;
        officeId: string;
        employeeId: string;
        checkInMode: CheckInMode;
        checkInTime: Date;
        checkOutTime: Date;
        isLate: boolean;
    }, {
        status: AttendanceStatus;
        officeId: string;
        employeeId: string;
        checkInMode: CheckInMode;
        checkInTime: Date;
        checkOutTime: Date;
        isLate?: boolean | undefined;
    }>, "atleastone">;
}, "strip", z.ZodTypeAny, {
    date: Date;
    attendance: [{
        status: AttendanceStatus;
        officeId: string;
        employeeId: string;
        checkInMode: CheckInMode;
        checkInTime: Date;
        checkOutTime: Date;
        isLate: boolean;
    }, ...{
        status: AttendanceStatus;
        officeId: string;
        employeeId: string;
        checkInMode: CheckInMode;
        checkInTime: Date;
        checkOutTime: Date;
        isLate: boolean;
    }[]];
}, {
    date: Date;
    attendance: [{
        status: AttendanceStatus;
        officeId: string;
        employeeId: string;
        checkInMode: CheckInMode;
        checkInTime: Date;
        checkOutTime: Date;
        isLate?: boolean | undefined;
    }, ...{
        status: AttendanceStatus;
        officeId: string;
        employeeId: string;
        checkInMode: CheckInMode;
        checkInTime: Date;
        checkOutTime: Date;
        isLate?: boolean | undefined;
    }[]];
}>;
export { AttendanceStatusEnum, CheckInModeEnum, AttendanceRecordSchema, HistoricalAttendanceSchema, };
//# sourceMappingURL=index.d.ts.map