import mongoose from "mongoose";
import { z } from "zod";

export const OrganizationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  sector: z.string().optional(),
  createdBy: z
    .string()
    .refine((val) => {
      return (
        mongoose.Types.ObjectId.isValid(val),
        {
          message: "Invalid user or admin Id",
        }
      );
    })
    .optional(),
  offices: z.array(z.string()).optional(),
  contactDetails: z
    .object({
      phone: z.string().optional(),
      email: z.string().email("Invalid email address").optional(),
      website: z.string().url("Invalid URL").optional(),
    })
    .optional(),
  address: z.string().optional(),
  status: z.enum(["active", "inactive", "pending"]).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  registrationNumber: z.string().optional(),
  logo: z.string().optional(),
  parentOrganizationId: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const editOrganizationSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  sector: z.string().optional(),
  createdBy: z
    .string()
    .refine((val) => {
      return (
        mongoose.Types.ObjectId.isValid(val),
        {
          message: "Invalid user or admin Id",
        }
      );
    })
    .optional(),
  offices: z.array(z.string()).optional(),
  contactDetails: z
    .object({
      phone: z.string().optional(),
      email: z.string().email("Invalid email address").optional(),
      website: z.string().url("Invalid URL").optional(),
    })
    .optional(),
  address: z.string().optional(),
  status: z.enum(["active", "inactive", "pending"]).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  registrationNumber: z.string().optional(),
  logo: z.string().optional(),
  parentOrganizationId: z.string().optional(),
  tags: z.array(z.string()).optional(),
});
