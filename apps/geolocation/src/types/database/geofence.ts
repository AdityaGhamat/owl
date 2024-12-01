import { Document, ObjectId } from "mongoose";

export interface IGeofence extends Document {
  name: string;
  description: string;
  type: "Polygon" | "Circle";
  coordinates: number[][];
  center?: { type: "Point"; coordinates: [number, number] };
  radius?: number;
  properties: Record<string, any>;
  organizationID: ObjectId;
  lat?: Number;
  lng?: Number;
  officeID: Object;
  createdAt: Date;
  updatedAt: Date;
}
