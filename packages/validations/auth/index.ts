import { z } from "zod";

const UserRoles = z.enum(["Admin", "Employee", "Manager", "Other"]);

const userSchema = z.object({
  _id: z.string().optional(),
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Maximum length is reached"),
  email: z
    .string()
    .email("Invalid email format")
    .min(3, "Minimum 3 characters are required")
    .max(70, "Maximum length 70 reached"),
  encryptedPassword: z
    .string()
    .min(5, "Minimum length is 5 required")
    .max(30, "Maximum length 30 reached"),
  role: z.enum(["Employee", "Manager", "Admin"]).default("Employee"),
  reset_password_token: z.string().optional(),
  reset_password_expires_on: z.date().optional(),
  verification_token: z.string().optional(),
  verification_token_expires_at: z.date().optional(),
  isVerified: z.boolean().default(false).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
  twoFactorEnabled: z.boolean().default(false).optional(),
  twoFactorSecret: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
    .optional(),
  oldPassword: z.array(z.string()).optional(),
  isDeleted: z.boolean().default(false).optional(),
  org_id: z.string().optional(),
  geofence_id: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  location: z
    .object({
      type: z.literal("Point"),
      coordinates: z.tuple([z.number(), z.number()]), // [longitude, latitude]
    })
    .optional(),
});

const editUserSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email format").optional(),
  role: UserRoles.default("Employee").optional(),
  reset_password_token: z.string().optional(),
  reset_password_expires_on: z.date().optional(),
  verification_token: z.string().optional(),
  verification_token_expires_at: z.date().optional(),
  isVerified: z.boolean().default(false).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
  twoFactorEnabled: z.boolean().default(false).optional(),
  twoFactorSecret: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
    .optional(),
  oldPassword: z.array(z.string()).optional(),
  isDeleted: z.boolean().default(false).optional(),
});

const userId = z.string();

const editUserSchemaTrpc = z.object({
  userId: userId,
  data: editUserSchema,
});

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(3, "Minimum 3 characters are required")
    .max(70, "Maximum length 70 reached"),
  encryptedPassword: z
    .string()
    .min(5, "Mininum length is 5 required")
    .max(30, "Maximum length 30 reached"),
});

const verifyEmailSchema = z.object({
  verification_token: z.string({
    message: "Enter valid verification token ",
  }),
});

const emailSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(3, "Minimum 3 characters are required")
    .max(70, "Maximum length 70 reached"),
});
const passwordSchema = z.object({
  encryptedPassword: z
    .string()
    .min(5, "Mininum length is 5 required")
    .max(30, "Maximum length 30 reached"),
});
const resetTokenSchema = z.object({
  reset_token: z.string({
    message: "Enter valid reset token",
  }),
});
const officeIdSchema = z.object({
  office_id: z.string({ message: "Office id should be valid string" }),
});
const employeeIdSchema = z.object({
  employee: z.array(z.string()),
});
export {
  userSchema,
  editUserSchema,
  userId,
  editUserSchemaTrpc,
  loginSchema,
  verifyEmailSchema,
  emailSchema,
  passwordSchema,
  resetTokenSchema,
  officeIdSchema,
  employeeIdSchema,
};
