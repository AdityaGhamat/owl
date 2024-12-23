import mongoose, { Document, ObjectId } from "mongoose";

export interface IAuth extends Document {
  _id: string;
  name?: string;
  email: string;
  encryptedPassword: string;
  role: "Employee" | "Manager" | "Admin" | "Other" | undefined;
  reset_password_token?: string;
  reset_password_expires_on?: Date;
  verification_token?: string;
  verification_token_expires_at?: Date;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  phoneNumber?: string;
  oldPassword?: any;
  isDeleted: boolean;
  org_id?: string;
  geofence_id?: string;
  lat?: number;
  lng?: number;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
}

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

export interface IOffice {
  _id: ObjectId;
  name: string;
  organizationId: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  contactDetails: {
    phone: string;
    email: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  startTime?: string;
  endTime?: string;
  status: "active" | "inactive" | "pending";
  createdAt?: Date;
  updatedAt?: Date;
}

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

export type location = {
  type: "Point";
  coordinates: [number, number];
};
