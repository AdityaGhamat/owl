"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuerySchema = exports.GeofenceSchemaEdit = exports.GeofenceSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const GeofenceType = zod_1.z.enum(["Polygon", "Circle"]);
const GeofenceCenter = zod_1.z.object({
    type: zod_1.z.literal("Point"),
    coordinates: zod_1.z.tuple([zod_1.z.number(), zod_1.z.number()]),
});
exports.GeofenceSchema = zod_1.z
    .object({
    name: zod_1.z.string().nonempty("Name is required"),
    description: zod_1.z.string().optional(),
    type: GeofenceType,
    coordinates: zod_1.z.array(zod_1.z.array(zod_1.z.number())).optional(),
    center: GeofenceCenter.optional(),
    radius: zod_1.z.number().positive("Radius must be a positive number").optional(),
    properties: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional(),
    lat: zod_1.z.number().int().optional(),
    lng: zod_1.z.number().int().optional(),
    organizationID: zod_1.z.string().refine((val) => {
        return (mongoose_1.default.Types.ObjectId.isValid(val),
            {
                message: "Invalid Organization ID",
            });
    }),
    officeID: zod_1.z.string().refine((val) => {
        return (mongoose_1.default.Types.ObjectId.isValid(val),
            {
                message: "Invalid Office Id",
            });
    }),
})
    .superRefine((data, ctx) => {
    if (data.type === "Polygon" && !data.coordinates) {
        ctx.addIssue({
            code: "custom",
            path: ["coordinates"],
            message: "Coordinates are required when type is Polygon",
        });
    }
    if (data.type === "Circle") {
        if (!data.center) {
            ctx.addIssue({
                code: "custom",
                path: ["center"],
                message: "Center is required when type is Circle",
            });
        }
        if (data.radius === undefined) {
            ctx.addIssue({
                code: "custom",
                path: ["radius"],
                message: "Radius is required when type is Circle",
            });
        }
    }
});
exports.GeofenceSchemaEdit = zod_1.z
    .object({
    name: zod_1.z.string().nonempty("Name is required").optional(),
    description: zod_1.z.string().optional(),
    type: GeofenceType.optional(),
    coordinates: zod_1.z.array(zod_1.z.array(zod_1.z.number())).optional(),
    center: GeofenceCenter.optional(),
    radius: zod_1.z.number().positive("Radius must be a positive number").optional(),
    properties: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional(),
    lat: zod_1.z.number().int().optional(),
    lng: zod_1.z.number().int().optional(),
    organizationID: zod_1.z.string().refine((val) => {
        return mongoose_1.default.Types.ObjectId.isValid(val);
    }),
    officeID: zod_1.z.string().refine((val) => {
        return mongoose_1.default.Types.ObjectId.isValid(val);
    }),
})
    .superRefine((data, ctx) => {
    if (data.type === "Polygon" && !data.coordinates) {
        ctx.addIssue({
            code: "custom",
            path: ["coordinates"],
            message: "Coordinates are required when type is Polygon",
        });
    }
    if (data.type === "Circle") {
        if (!data.center) {
            ctx.addIssue({
                code: "custom",
                path: ["center"],
                message: "Center is required when type is Circle",
            });
        }
        if (data.radius === undefined) {
            ctx.addIssue({
                code: "custom",
                path: ["radius"],
                message: "Radius is required when type is Circle",
            });
        }
    }
});
exports.QuerySchema = zod_1.z.object({
    lat: zod_1.z
        .string()
        .transform(Number)
        .refine((val) => !isNaN(val), "Invalid latitude"),
    lng: zod_1.z
        .string()
        .transform(Number)
        .refine((val) => !isNaN(val), "Invalid longitude"),
    distance: zod_1.z
        .string()
        .optional()
        .transform(Number)
        .refine((val) => !isNaN(val), "Invalid distance")
        .optional(),
});
