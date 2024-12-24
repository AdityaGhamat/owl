import { z } from "zod";
import { members } from "@repo/validations/attendance";
export type members = z.infer<typeof members>;
