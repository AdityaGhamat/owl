import { OrganizationSchema } from "@repo/validations/organizations";
import { z } from "zod";

export type organizationCreation = z.infer<typeof OrganizationSchema>;
