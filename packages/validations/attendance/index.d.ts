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
export { AttendanceSchema, updateAttendanceSchema };
//# sourceMappingURL=index.d.ts.map