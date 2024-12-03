import { Schema, model } from "mongoose";
import { IOrganization } from "../types/database/organization-type.js";

const organizationSchema = new Schema<IOrganization>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sector: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
    },
    offices: [{ type: Schema.Types.ObjectId }],
    contactDetails: {
      phone: {
        type: String,
      },
      email: {
        type: String,
      },
      website: {
        type: String,
      },
    },
    address: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    registrationNumber: {
      type: String,
    },
    logo: {
      type: String,
    },
    parentOrganizationId: {
      type: Schema.Types.ObjectId,
    },
    tags: [{ type: String }],
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

const Organization = model("Organization", organizationSchema);
export default Organization;
