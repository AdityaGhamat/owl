import { z } from "zod";
import { members } from "@repo/validations/attendance";

export type members = z.infer<typeof members>;

export type attendance_queue_Type = {
  officeId: string;
  members: members;
};

export type attendance_queue = "attendance_queue";
