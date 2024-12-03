import mongoose, { Model, Schema } from "mongoose";
import { IGeofence } from "../types/database/geofence.js";

const geofenceSchema = new Schema<IGeofence>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: ["Polygon", "Circle"],
      required: true,
    },
    coordinates: {
      type: [[Number]],
      required: function () {
        return this.type === "Polygon";
      },
    },
    center: {
      type: { type: String, enum: ["Point"], required: false },
      coordinates: {
        type: [Number],
        required: function () {
          return this.type === "Circle";
        },
      },
    },
    radius: {
      type: Number,
      required: function () {
        this.type = "Circle";
      },
    },
    lat: {
      type: Number,
      required: function () {
        return this.type === "Circle";
      },
    },
    lng: {
      type: Number,
      required: function () {
        return this.type === "Circle";
      },
    },

    properties: {
      type: Map,
      of: Schema.Types.Mixed,
    },
    organizationID: {
      type: String,
      required: true,
    },
    officeID: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
      },
    },

    toObject: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
      },
    },
  }
);

geofenceSchema.index({ center: "2dsphere" });
geofenceSchema.index({ coordinates: "2dsphere" });

const Geofence: Model<IGeofence> = mongoose.model("Geofence", geofenceSchema);
export default Geofence;
