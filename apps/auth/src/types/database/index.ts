import mongoose, { Document, ObjectId } from "mongoose";

interface IAuth extends Document {
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

export default IAuth;
