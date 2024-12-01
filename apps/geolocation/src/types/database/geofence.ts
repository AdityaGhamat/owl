import { Document, ObjectId } from "mongoose";

export interface IGeofence extends Document {
  name: string;
  description: string;
  type: "Polygon" | "Circle";
  coordinates: number[][];
  center?: { type: "Point"; coordinates: [number, number] };
  radius?: number;
  properties: Record<string, any>;
  organizationID: string;
  lat?: Number;
  lng?: Number;
  officeID: string;
  createdAt: Date;
  updatedAt: Date;
}
