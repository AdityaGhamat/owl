import { GeofenceSchema } from "@repo/validations/geofence";
import { z } from "zod";
import { JWTPayload } from "jose";

export type geofenceCreation = z.infer<typeof GeofenceSchema>;

export interface CustomJWTPayload extends JWTPayload {
  userId: string;
  expires: number;
}
