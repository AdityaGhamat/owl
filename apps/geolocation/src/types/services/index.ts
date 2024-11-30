import { GeofenceSchema } from "@repo/validations/geofence";
import { z } from "zod";

export type geofenceCreation = z.infer<typeof GeofenceSchema>;
