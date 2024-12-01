import { ObjectId, Document } from "mongoose";

export interface IOrganization extends Document {
  name: string;
  description: string;
  sector?: string;
  createdBy?: string;
  offices: string[];
  contactDetails?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  address?: string;
  status?: "active" | "inactive" | "pending";
  createdAt?: Date;
  updatedAt?: Date;
  registrationNumber?: string;
  logo?: string;
  parentOrganizationId?: string;
  tags?: string[];
}
