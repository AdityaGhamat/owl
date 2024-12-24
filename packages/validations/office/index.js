"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOfficeSchema = exports.createOfficeSchema = exports.officeBaseSchema = void 0;
const zod_1 = require("zod");
const locationSchema = zod_1.z.object({
    type: zod_1.z.literal("Point"),
    coordinates: zod_1.z.tuple([zod_1.z.number(), zod_1.z.number()]), // [longitude, latitude]
});
const addressSchema = zod_1.z.object({
    street: zod_1.z.string().min(1, "Street is required"),
    city: zod_1.z.string().min(1, "City is required"),
    state: zod_1.z.string().min(1, "State is required"),
    zipCode: zod_1.z.string().min(1, "Zip code is required"),
    country: zod_1.z.string().min(1, "Country is required"),
});
const contactDetailsSchema = zod_1.z.object({
    phone: zod_1.z.string().min(1, "Phone is required"),
    email: zod_1.z.string().email("Invalid email address"),
});
exports.officeBaseSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    organizationId: zod_1.z.string().min(1, "Organization ID is required"),
    location: locationSchema,
    contactDetails: contactDetailsSchema,
    address: addressSchema,
    startTime: zod_1.z.string().optional(),
    endTime: zod_1.z.string().optional(),
    status: zod_1.z.enum(["active", "inactive", "pending"]).default("active"),
});
exports.createOfficeSchema = exports.officeBaseSchema.omit({
    status: true,
});
exports.updateOfficeSchema = exports.officeBaseSchema.partial();
