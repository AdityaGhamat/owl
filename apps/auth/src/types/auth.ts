import { z } from "zod";
import {
  userSchema,
  editUserSchema,
  verifyEmailSchema,
  emailSchema,
  passwordSchema,
  resetTokenSchema,
} from "@repo/validations";
export type userCreation = z.infer<typeof userSchema>;
export type editUser = z.infer<typeof editUserSchema>;
export type verificationMailType = {
  email: string;
  verification_token: string;
};
export type resetPasswordMailType = {
  email: string;
  reset_password_token: string;
};
export type verifyEmailType = z.infer<typeof verifyEmailSchema>;
export type emailType = z.infer<typeof emailSchema>;
export type passwordType = z.infer<typeof passwordSchema>;
export type resetTokenType = z.infer<typeof resetTokenSchema>;
