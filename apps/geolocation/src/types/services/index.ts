import { GeofenceSchema } from "@repo/validations/geofence";
import { members } from "@repo/validations/attendance";
import { z } from "zod";
import { JWTPayload } from "jose";

export type geofenceCreation = z.infer<typeof GeofenceSchema>;

export interface CustomJWTPayload extends JWTPayload {
  userId: string;
  expires: number;
}
export type members = z.infer<typeof members>;
