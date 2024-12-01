"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editOrganizationSchema = exports.OrganizationSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
exports.OrganizationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    sector: zod_1.z.string().optional(),
    createdBy: zod_1.z
        .string()
        .refine((val) => {
        return (mongoose_1.default.Types.ObjectId.isValid(val),
            {
                message: "Invalid user or admin Id",
            });
    })
        .optional(),
    offices: zod_1.z.array(zod_1.z.string()).optional(),
    contactDetails: zod_1.z
        .object({
        phone: zod_1.z.string().optional(),
        email: zod_1.z.string().email("Invalid email address").optional(),
        website: zod_1.z.string().url("Invalid URL").optional(),
    })
        .optional(),
    address: zod_1.z.string().optional(),
    status: zod_1.z.enum(["active", "inactive", "pending"]).optional(),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
    registrationNumber: zod_1.z.string().optional(),
    logo: zod_1.z.string().optional(),
    parentOrganizationId: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.editOrganizationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required").optional(),
    description: zod_1.z.string().min(1, "Description is required").optional(),
    sector: zod_1.z.string().optional(),
    createdBy: zod_1.z
        .string()
        .refine((val) => {
        return (mongoose_1.default.Types.ObjectId.isValid(val),
            {
                message: "Invalid user or admin Id",
            });
    })
        .optional(),
    offices: zod_1.z.array(zod_1.z.string()).optional(),
    contactDetails: zod_1.z
        .object({
        phone: zod_1.z.string().optional(),
        email: zod_1.z.string().email("Invalid email address").optional(),
        website: zod_1.z.string().url("Invalid URL").optional(),
    })
        .optional(),
    address: zod_1.z.string().optional(),
    status: zod_1.z.enum(["active", "inactive", "pending"]).optional(),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
    registrationNumber: zod_1.z.string().optional(),
    logo: zod_1.z.string().optional(),
    parentOrganizationId: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
});
