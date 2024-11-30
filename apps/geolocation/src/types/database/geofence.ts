import { Document } from "mongoose";

export interface IGeofence extends Document {
  name: string;
  description: string;
  type: "Polygon" | "Circle";
  coordinates: number[][];
  center?: { type: "Point"; coordinates: [number, number] };
  radius?: number;
  properties: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
