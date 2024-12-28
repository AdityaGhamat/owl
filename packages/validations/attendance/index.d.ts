import { z } from "zod";
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
declare const AttendanceSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    employeeId: z.ZodString;
    officeId: z.ZodString;
    date: z.ZodOptional<z.ZodDate>;
    checkInTime: z.ZodOptional<z.ZodDate>;
    checkOutTime: z.ZodOptional<z.ZodDate>;
    status: z.ZodOptional<z.ZodNativeEnum<typeof AttendanceStatus>>;
    checkInMode: z.ZodOptional<z.ZodNativeEnum<typeof CheckInMode>>;
    isLate: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    officeId: string;
    employeeId: string;
    isLate: boolean;
    id?: string | undefined;
    status?: AttendanceStatus | undefined;
    date?: Date | undefined;
    checkInTime?: Date | undefined;
    checkOutTime?: Date | undefined;
    checkInMode?: CheckInMode | undefined;
}, {
    officeId: string;
    employeeId: string;
    id?: string | undefined;
    status?: AttendanceStatus | undefined;
    date?: Date | undefined;
    checkInTime?: Date | undefined;
    checkOutTime?: Date | undefined;
    checkInMode?: CheckInMode | undefined;
    isLate?: boolean | undefined;
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
    date: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
    checkInTime: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
    checkOutTime: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
    status: z.ZodOptional<z.ZodOptional<z.ZodNativeEnum<typeof AttendanceStatus>>>;
    checkInMode: z.ZodOptional<z.ZodOptional<z.ZodNativeEnum<typeof CheckInMode>>>;
    isLate: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    id?: string | undefined;
    status?: AttendanceStatus | undefined;
    date?: Date | undefined;
    officeId?: string | undefined;
    employeeId?: string | undefined;
    checkInTime?: Date | undefined;
    checkOutTime?: Date | undefined;
    checkInMode?: CheckInMode | undefined;
    isLate?: boolean | undefined;
}, {
    id?: string | undefined;
    status?: AttendanceStatus | undefined;
    date?: Date | undefined;
    officeId?: string | undefined;
    employeeId?: string | undefined;
    checkInTime?: Date | undefined;
    checkOutTime?: Date | undefined;
    checkInMode?: CheckInMode | undefined;
    isLate?: boolean | undefined;
}>;
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
    checkInTime: Date;
    checkOutTime: Date;
    checkInMode: CheckInMode;
    isLate: boolean;
}, {
    status: AttendanceStatus;
    officeId: string;
    employeeId: string;
    checkInTime: Date;
    checkOutTime: Date;
    checkInMode: CheckInMode;
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
        checkInTime: Date;
        checkOutTime: Date;
        checkInMode: CheckInMode;
        isLate: boolean;
    }, {
        status: AttendanceStatus;
        officeId: string;
        employeeId: string;
        checkInTime: Date;
        checkOutTime: Date;
        checkInMode: CheckInMode;
        isLate?: boolean | undefined;
    }>, "atleastone">;
}, "strip", z.ZodTypeAny, {
    date: Date;
    attendance: [{
        status: AttendanceStatus;
        officeId: string;
        employeeId: string;
        checkInTime: Date;
        checkOutTime: Date;
        checkInMode: CheckInMode;
        isLate: boolean;
    }, ...{
        status: AttendanceStatus;
        officeId: string;
        employeeId: string;
        checkInTime: Date;
        checkOutTime: Date;
        checkInMode: CheckInMode;
        isLate: boolean;
    }[]];
}, {
    date: Date;
    attendance: [{
        status: AttendanceStatus;
        officeId: string;
        employeeId: string;
        checkInTime: Date;
        checkOutTime: Date;
        checkInMode: CheckInMode;
        isLate?: boolean | undefined;
    }, ...{
        status: AttendanceStatus;
        officeId: string;
        employeeId: string;
        checkInTime: Date;
        checkOutTime: Date;
        checkInMode: CheckInMode;
        isLate?: boolean | undefined;
    }[]];
}>;
export { AttendanceSchema, updateAttendanceSchema, members, membersSchema, AttendanceRecordSchema, HistoricalAttendanceSchema, };
//# sourceMappingURL=index.d.ts.map