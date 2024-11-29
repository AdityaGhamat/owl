import { z } from "zod";
declare const userSchema: z.ZodObject<{
    user_id: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    email: z.ZodString;
    encryptedPassword: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<["Admin", "Employee", "Manager", "Other"]>>;
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
    name: string;
    email: string;
    encryptedPassword: string;
    role: "Admin" | "Employee" | "Manager" | "Other";
    user_id?: string | undefined;
    reset_password_token?: string | undefined;
    reset_password_expires_on?: Date | undefined;
    verification_token?: string | undefined;
    verification_token_expires_at?: Date | undefined;
    isVerified?: boolean | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    twoFactorEnabled?: boolean | undefined;
    twoFactorSecret?: string | undefined;
    phoneNumber?: string | undefined;
    oldPassword?: string[] | undefined;
    isDeleted?: boolean | undefined;
}, {
    name: string;
    email: string;
    encryptedPassword: string;
    user_id?: string | undefined;
    role?: "Admin" | "Employee" | "Manager" | "Other" | undefined;
    reset_password_token?: string | undefined;
    reset_password_expires_on?: Date | undefined;
    verification_token?: string | undefined;
    verification_token_expires_at?: Date | undefined;
    isVerified?: boolean | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    twoFactorEnabled?: boolean | undefined;
    twoFactorSecret?: string | undefined;
    phoneNumber?: string | undefined;
    oldPassword?: string[] | undefined;
    isDeleted?: boolean | undefined;
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
    name?: string | undefined;
    email?: string | undefined;
    role?: "Admin" | "Employee" | "Manager" | "Other" | undefined;
    reset_password_token?: string | undefined;
    reset_password_expires_on?: Date | undefined;
    verification_token?: string | undefined;
    verification_token_expires_at?: Date | undefined;
    isVerified?: boolean | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    twoFactorEnabled?: boolean | undefined;
    twoFactorSecret?: string | undefined;
    phoneNumber?: string | undefined;
    oldPassword?: string[] | undefined;
    isDeleted?: boolean | undefined;
}, {
    name?: string | undefined;
    email?: string | undefined;
    role?: "Admin" | "Employee" | "Manager" | "Other" | undefined;
    reset_password_token?: string | undefined;
    reset_password_expires_on?: Date | undefined;
    verification_token?: string | undefined;
    verification_token_expires_at?: Date | undefined;
    isVerified?: boolean | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    twoFactorEnabled?: boolean | undefined;
    twoFactorSecret?: string | undefined;
    phoneNumber?: string | undefined;
    oldPassword?: string[] | undefined;
    isDeleted?: boolean | undefined;
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
        name?: string | undefined;
        email?: string | undefined;
        role?: "Admin" | "Employee" | "Manager" | "Other" | undefined;
        reset_password_token?: string | undefined;
        reset_password_expires_on?: Date | undefined;
        verification_token?: string | undefined;
        verification_token_expires_at?: Date | undefined;
        isVerified?: boolean | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        createdBy?: string | undefined;
        updatedBy?: string | undefined;
        twoFactorEnabled?: boolean | undefined;
        twoFactorSecret?: string | undefined;
        phoneNumber?: string | undefined;
        oldPassword?: string[] | undefined;
        isDeleted?: boolean | undefined;
    }, {
        name?: string | undefined;
        email?: string | undefined;
        role?: "Admin" | "Employee" | "Manager" | "Other" | undefined;
        reset_password_token?: string | undefined;
        reset_password_expires_on?: Date | undefined;
        verification_token?: string | undefined;
        verification_token_expires_at?: Date | undefined;
        isVerified?: boolean | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        createdBy?: string | undefined;
        updatedBy?: string | undefined;
        twoFactorEnabled?: boolean | undefined;
        twoFactorSecret?: string | undefined;
        phoneNumber?: string | undefined;
        oldPassword?: string[] | undefined;
        isDeleted?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    data: {
        name?: string | undefined;
        email?: string | undefined;
        role?: "Admin" | "Employee" | "Manager" | "Other" | undefined;
        reset_password_token?: string | undefined;
        reset_password_expires_on?: Date | undefined;
        verification_token?: string | undefined;
        verification_token_expires_at?: Date | undefined;
        isVerified?: boolean | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        createdBy?: string | undefined;
        updatedBy?: string | undefined;
        twoFactorEnabled?: boolean | undefined;
        twoFactorSecret?: string | undefined;
        phoneNumber?: string | undefined;
        oldPassword?: string[] | undefined;
        isDeleted?: boolean | undefined;
    };
}, {
    userId: string;
    data: {
        name?: string | undefined;
        email?: string | undefined;
        role?: "Admin" | "Employee" | "Manager" | "Other" | undefined;
        reset_password_token?: string | undefined;
        reset_password_expires_on?: Date | undefined;
        verification_token?: string | undefined;
        verification_token_expires_at?: Date | undefined;
        isVerified?: boolean | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        createdBy?: string | undefined;
        updatedBy?: string | undefined;
        twoFactorEnabled?: boolean | undefined;
        twoFactorSecret?: string | undefined;
        phoneNumber?: string | undefined;
        oldPassword?: string[] | undefined;
        isDeleted?: boolean | undefined;
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
export { userSchema, editUserSchema, userId, editUserSchemaTrpc, loginSchema, verifyEmailSchema, emailSchema, passwordSchema, resetTokenSchema, };
//# sourceMappingURL=index.d.ts.map