import { z } from "zod";

const locationSchema = z.object({
  type: z.literal("Point"),
  coordinates: z.tuple([z.number(), z.number()]), // [longitude, latitude]
});

const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  country: z.string().min(1, "Country is required"),
});

const contactDetailsSchema = z.object({
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email address"),
});

export const officeBaseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  organizationId: z.string().min(1, "Organization ID is required"),
  location: locationSchema,
  contactDetails: contactDetailsSchema,
  address: addressSchema,
  status: z.enum(["active", "inactive", "pending"]).default("active"),
});

export const createOfficeSchema = officeBaseSchema.omit({
  status: true,
});

export const updateOfficeSchema = officeBaseSchema.partial();
