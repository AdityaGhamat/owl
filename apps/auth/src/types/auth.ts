import { z } from "zod";
import { userSchema, editUserSchema } from "@repo/validations";
export type userCreation = z.infer<typeof userSchema>;
export type editUser = z.infer<typeof editUserSchema>;
