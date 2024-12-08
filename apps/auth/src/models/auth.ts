import mongoose, { Schema, model } from "mongoose";
import IAuth from "../types/database/index.js";

const userSchema = new Schema<IAuth>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  encryptedPassword: { type: String, required: true },
  role: {
    type: String,
    enum: ["Employee", "Manager", "Admin"],
    default: "Employee",
  },
  reset_password_token: String,
  reset_password_expires_on: Date,
  verification_token: String,
  verification_token_expires_at: Date,
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  twoFactorEnabled: { type: Boolean, default: false },
  twoFactorSecret: String,
  phoneNumber: String,
  oldPassword: Schema.Types.Mixed,
  isDeleted: { type: Boolean, default: false },
  org_id: { type: String },
  geofence_id: { type: String },
  lat: Number,
  lng: Number,
  location: {
    type: { type: String, enum: ["Point"] },
    coordinates: { type: [Number] },
  },
});
userSchema.index({ location: "2dsphere" });
const User = mongoose.model<IAuth>("User", userSchema);

export default User;
