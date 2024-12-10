"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.officeIdSchema = exports.resetTokenSchema = exports.passwordSchema = exports.emailSchema = exports.verifyEmailSchema = exports.loginSchema = exports.editUserSchemaTrpc = exports.userId = exports.editUserSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
const UserRoles = zod_1.z.enum(["Admin", "Employee", "Manager", "Other"]);
const userSchema = zod_1.z.object({
    _id: zod_1.z.string().optional(),
    name: zod_1.z
        .string()
        .min(1, "Name is required")
        .max(50, "Maximum length is reached"),
    email: zod_1.z
        .string()
        .email("Invalid email format")
        .min(3, "Minimum 3 characters are required")
        .max(70, "Maximum length 70 reached"),
    encryptedPassword: zod_1.z
        .string()
        .min(5, "Minimum length is 5 required")
        .max(30, "Maximum length 30 reached"),
    role: zod_1.z.enum(["Employee", "Manager", "Admin"]).default("Employee"),
    reset_password_token: zod_1.z.string().optional(),
    reset_password_expires_on: zod_1.z.date().optional(),
    verification_token: zod_1.z.string().optional(),
    verification_token_expires_at: zod_1.z.date().optional(),
    isVerified: zod_1.z.boolean().default(false).optional(),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
    createdBy: zod_1.z.string().optional(),
    updatedBy: zod_1.z.string().optional(),
    twoFactorEnabled: zod_1.z.boolean().default(false).optional(),
    twoFactorSecret: zod_1.z.string().optional(),
    phoneNumber: zod_1.z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
        .optional(),
    oldPassword: zod_1.z.array(zod_1.z.string()).optional(),
    isDeleted: zod_1.z.boolean().default(false).optional(),
    org_id: zod_1.z.string().optional(),
    geofence_id: zod_1.z.string().optional(),
    lat: zod_1.z.number().optional(),
    lng: zod_1.z.number().optional(),
    location: zod_1.z
        .object({
        type: zod_1.z.literal("Point"),
        coordinates: zod_1.z.tuple([zod_1.z.number(), zod_1.z.number()]), // [longitude, latitude]
    })
        .optional(),
});
exports.userSchema = userSchema;
const editUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required").optional(),
    email: zod_1.z.string().email("Invalid email format").optional(),
    role: UserRoles.default("Employee").optional(),
    reset_password_token: zod_1.z.string().optional(),
    reset_password_expires_on: zod_1.z.date().optional(),
    verification_token: zod_1.z.string().optional(),
    verification_token_expires_at: zod_1.z.date().optional(),
    isVerified: zod_1.z.boolean().default(false).optional(),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
    createdBy: zod_1.z.string().optional(),
    updatedBy: zod_1.z.string().optional(),
    twoFactorEnabled: zod_1.z.boolean().default(false).optional(),
    twoFactorSecret: zod_1.z.string().optional(),
    phoneNumber: zod_1.z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
        .optional(),
    oldPassword: zod_1.z.array(zod_1.z.string()).optional(),
    isDeleted: zod_1.z.boolean().default(false).optional(),
});
exports.editUserSchema = editUserSchema;
const userId = zod_1.z.string();
exports.userId = userId;
const editUserSchemaTrpc = zod_1.z.object({
    userId: userId,
    data: editUserSchema,
});
exports.editUserSchemaTrpc = editUserSchemaTrpc;
const loginSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email("Invalid email format")
        .min(3, "Minimum 3 characters are required")
        .max(70, "Maximum length 70 reached"),
    encryptedPassword: zod_1.z
        .string()
        .min(5, "Mininum length is 5 required")
        .max(30, "Maximum length 30 reached"),
});
exports.loginSchema = loginSchema;
const verifyEmailSchema = zod_1.z.object({
    verification_token: zod_1.z.string({
        message: "Enter valid verification token ",
    }),
});
exports.verifyEmailSchema = verifyEmailSchema;
const emailSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email("Invalid email format")
        .min(3, "Minimum 3 characters are required")
        .max(70, "Maximum length 70 reached"),
});
exports.emailSchema = emailSchema;
const passwordSchema = zod_1.z.object({
    encryptedPassword: zod_1.z
        .string()
        .min(5, "Mininum length is 5 required")
        .max(30, "Maximum length 30 reached"),
});
exports.passwordSchema = passwordSchema;
const resetTokenSchema = zod_1.z.object({
    reset_token: zod_1.z.string({
        message: "Enter valid reset token",
    }),
});
exports.resetTokenSchema = resetTokenSchema;
const officeIdSchema = zod_1.z.object({
    office_id: zod_1.z.string({ message: "Office id should be valid string" }),
});
exports.officeIdSchema = officeIdSchema;
