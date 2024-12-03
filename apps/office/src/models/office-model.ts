import { Schema, model } from "mongoose";
import { IOffice } from "../types/database/index.js";

const officeSchema = new Schema<IOffice>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    organizationId: {
      type: String,
      ref: "Organization",
      required: true,
    },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true },
    },
    contactDetails: {
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
      },
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "active",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
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

officeSchema.index({ location: "2dsphere" });

const Office = model("Office", officeSchema);

export default Office;
