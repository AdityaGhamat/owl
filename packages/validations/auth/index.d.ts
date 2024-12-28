import { z } from "zod";
declare const userSchema: z.ZodObject<{
    _id: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    email: z.ZodString;
    encryptedPassword: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<["Employee", "Manager", "Admin"]>>;
    reset_password_token: z.ZodOptional<z.ZodString>;
    reset_password_expires_on: z.ZodOptional<z.ZodDate>;
    verification_token: z.ZodOptional<z.ZodString>;
    verification_token_expires_at: z.ZodOptional<z.ZodDate>;
    isVerified: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
    createdBy: z.ZodOptional<z.ZodString>;
    updatedBy: z.ZodOptional<z.ZodString>;
    twoFactorEnabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    twoFactorSecret: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodString>;
    oldPassword: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isDeleted: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    org_id: z.ZodOptional<z.ZodString>;
    geofence_id: z.ZodOptional<z.ZodString>;
    lat: z.ZodOptional<z.ZodNumber>;
    lng: z.ZodOptional<z.ZodNumber>;
    location: z.ZodOptional<z.ZodObject<{
        type: z.ZodLiteral<"Point">;
        coordinates: z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>;
    }, "strip", z.ZodTypeAny, {
        type: "Point";
        coordinates: [number, number];
    }, {
        type: "Point";
        coordinates: [number, number];
    }>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    role: "Employee" | "Manager" | "Admin";
    encryptedPassword: string;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    twoFactorEnabled?: boolean | undefined;
    isDeleted?: boolean | undefined;
    _id?: string | undefined;
    reset_password_token?: string | undefined;
    reset_password_expires_on?: Date | undefined;
    verification_token?: string | undefined;
    verification_token_expires_at?: Date | undefined;
    isVerified?: boolean | undefined;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    twoFactorSecret?: string | undefined;
    phoneNumber?: string | undefined;
    oldPassword?: string[] | undefined;
    org_id?: string | undefined;
    geofence_id?: string | undefined;
    lat?: number | undefined;
    lng?: number | undefined;
    location?: {
        type: "Point";
        coordinates: [number, number];
    } | undefined;
}, {
    name: string;
    email: string;
    encryptedPassword: string;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    role?: "Employee" | "Manager" | "Admin" | undefined;
    twoFactorEnabled?: boolean | undefined;
    isDeleted?: boolean | undefined;
    _id?: string | undefined;
    reset_password_token?: string | undefined;
    reset_password_expires_on?: Date | undefined;
    verification_token?: string | undefined;
    verification_token_expires_at?: Date | undefined;
    isVerified?: boolean | undefined;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    twoFactorSecret?: string | undefined;
    phoneNumber?: string | undefined;
    oldPassword?: string[] | undefined;
    org_id?: string | undefined;
    geofence_id?: string | undefined;
    lat?: number | undefined;
    lng?: number | undefined;
    location?: {
        type: "Point";
        coordinates: [number, number];
    } | undefined;
}>;
declare const editUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodDefault<z.ZodEnum<["Admin", "Employee", "Manager", "Other"]>>>;
    reset_password_token: z.ZodOptional<z.ZodString>;
    reset_password_expires_on: z.ZodOptional<z.ZodDate>;
    verification_token: z.ZodOptional<z.ZodString>;
    verification_token_expires_at: z.ZodOptional<z.ZodDate>;
    isVerified: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
    createdBy: z.ZodOptional<z.ZodString>;
    updatedBy: z.ZodOptional<z.ZodString>;
    twoFactorEnabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    twoFactorSecret: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodString>;
    oldPassword: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isDeleted: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    name?: string | undefined;
    email?: string | undefined;
    role?: "Employee" | "Manager" | "Admin" | "Other" | undefined;
    twoFactorEnabled?: boolean | undefined;
    isDeleted?: boolean | undefined;
    reset_password_token?: string | undefined;
    reset_password_expires_on?: Date | undefined;
    verification_token?: string | undefined;
    verification_token_expires_at?: Date | undefined;
    isVerified?: boolean | undefined;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    twoFactorSecret?: string | undefined;
    phoneNumber?: string | undefined;
    oldPassword?: string[] | undefined;
}, {
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    name?: string | undefined;
    email?: string | undefined;
    role?: "Employee" | "Manager" | "Admin" | "Other" | undefined;
    twoFactorEnabled?: boolean | undefined;
    isDeleted?: boolean | undefined;
    reset_password_token?: string | undefined;
    reset_password_expires_on?: Date | undefined;
    verification_token?: string | undefined;
    verification_token_expires_at?: Date | undefined;
    isVerified?: boolean | undefined;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    twoFactorSecret?: string | undefined;
    phoneNumber?: string | undefined;
    oldPassword?: string[] | undefined;
}>;
declare const userId: z.ZodString;
declare const editUserSchemaTrpc: z.ZodObject<{
    userId: z.ZodString;
    data: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        role: z.ZodOptional<z.ZodDefault<z.ZodEnum<["Admin", "Employee", "Manager", "Other"]>>>;
        reset_password_token: z.ZodOptional<z.ZodString>;
        reset_password_expires_on: z.ZodOptional<z.ZodDate>;
        verification_token: z.ZodOptional<z.ZodString>;
        verification_token_expires_at: z.ZodOptional<z.ZodDate>;
        isVerified: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        createdAt: z.ZodOptional<z.ZodDate>;
        updatedAt: z.ZodOptional<z.ZodDate>;
        createdBy: z.ZodOptional<z.ZodString>;
        updatedBy: z.ZodOptional<z.ZodString>;
        twoFactorEnabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        twoFactorSecret: z.ZodOptional<z.ZodString>;
        phoneNumber: z.ZodOptional<z.ZodString>;
        oldPassword: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        isDeleted: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        name?: string | undefined;
        email?: string | undefined;
        role?: "Employee" | "Manager" | "Admin" | "Other" | undefined;
        twoFactorEnabled?: boolean | undefined;
        isDeleted?: boolean | undefined;
        reset_password_token?: string | undefined;
        reset_password_expires_on?: Date | undefined;
        verification_token?: string | undefined;
        verification_token_expires_at?: Date | undefined;
        isVerified?: boolean | undefined;
        createdBy?: string | undefined;
        updatedBy?: string | undefined;
        twoFactorSecret?: string | undefined;
        phoneNumber?: string | undefined;
        oldPassword?: string[] | undefined;
    }, {
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        name?: string | undefined;
        email?: string | undefined;
        role?: "Employee" | "Manager" | "Admin" | "Other" | undefined;
        twoFactorEnabled?: boolean | undefined;
        isDeleted?: boolean | undefined;
        reset_password_token?: string | undefined;
        reset_password_expires_on?: Date | undefined;
        verification_token?: string | undefined;
        verification_token_expires_at?: Date | undefined;
        isVerified?: boolean | undefined;
        createdBy?: string | undefined;
        updatedBy?: string | undefined;
        twoFactorSecret?: string | undefined;
        phoneNumber?: string | undefined;
        oldPassword?: string[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    data: {
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        name?: string | undefined;
        email?: string | undefined;
        role?: "Employee" | "Manager" | "Admin" | "Other" | undefined;
        twoFactorEnabled?: boolean | undefined;
        isDeleted?: boolean | undefined;
        reset_password_token?: string | undefined;
        reset_password_expires_on?: Date | undefined;
        verification_token?: string | undefined;
        verification_token_expires_at?: Date | undefined;
        isVerified?: boolean | undefined;
        createdBy?: string | undefined;
        updatedBy?: string | undefined;
        twoFactorSecret?: string | undefined;
        phoneNumber?: string | undefined;
        oldPassword?: string[] | undefined;
    };
}, {
    userId: string;
    data: {
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        name?: string | undefined;
        email?: string | undefined;
        role?: "Employee" | "Manager" | "Admin" | "Other" | undefined;
        twoFactorEnabled?: boolean | undefined;
        isDeleted?: boolean | undefined;
        reset_password_token?: string | undefined;
        reset_password_expires_on?: Date | undefined;
        verification_token?: string | undefined;
        verification_token_expires_at?: Date | undefined;
        isVerified?: boolean | undefined;
        createdBy?: string | undefined;
        updatedBy?: string | undefined;
        twoFactorSecret?: string | undefined;
        phoneNumber?: string | undefined;
        oldPassword?: string[] | undefined;
    };
}>;
declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    encryptedPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    encryptedPassword: string;
}, {
    email: string;
    encryptedPassword: string;
}>;
declare const verifyEmailSchema: z.ZodObject<{
    verification_token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    verification_token: string;
}, {
    verification_token: string;
}>;
declare const emailSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
declare const passwordSchema: z.ZodObject<{
    encryptedPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    encryptedPassword: string;
}, {
    encryptedPassword: string;
}>;
declare const resetTokenSchema: z.ZodObject<{
    reset_token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    reset_token: string;
}, {
    reset_token: string;
}>;
declare const officeIdSchema: z.ZodObject<{
    office_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    office_id: string;
}, {
    office_id: string;
}>;
declare const employeeIdSchema: z.ZodObject<{
    employee: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    employee: string[];
}, {
    employee: string[];
}>;
export { userSchema, editUserSchema, userId, editUserSchemaTrpc, loginSchema, verifyEmailSchema, emailSchema, passwordSchema, resetTokenSchema, officeIdSchema, employeeIdSchema, };
//# sourceMappingURL=index.d.ts.map