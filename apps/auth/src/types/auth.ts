import { z } from "zod";
import { userSchema, editUserSchema } from "@repo/validations";
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
