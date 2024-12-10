import { z } from "zod";
import mongoose, { mongo } from "mongoose";
const GeofenceType = z.enum(["Polygon", "Circle"]);

const GeofenceCenter = z.object({
  type: z.literal("Point"),
  coordinates: z.tuple([z.number(), z.number()]),
});

export const GeofenceSchema = z
  .object({
    type: GeofenceType,
    coordinates: z.array(z.array(z.number())).optional(),
    center: GeofenceCenter.optional(),
    radius: z.number().positive("Radius must be a positive number").optional(),
    properties: z.record(z.string(), z.any()).optional(),
    lat: z.number().int().optional(),
    lng: z.number().int().optional(),
    organizationID: z.string().refine((val) => {
      return (
        mongoose.Types.ObjectId.isValid(val),
        {
          message: "Invalid Organization ID",
        }
      );
    }),
    officeID: z.string().refine((val) => {
      return (
        mongoose.Types.ObjectId.isValid(val),
        {
          message: "Invalid Office Id",
        }
      );
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

export const GeofenceSchemaEdit = z
  .object({
    name: z.string().nonempty("Name is required").optional(),
    description: z.string().optional(),
    type: GeofenceType.optional(),
    coordinates: z.array(z.array(z.number())).optional(),
    center: GeofenceCenter.optional(),
    radius: z.number().positive("Radius must be a positive number").optional(),
    properties: z.record(z.string(), z.any()).optional(),
    lat: z.number().int().optional(),
    lng: z.number().int().optional(),
    organizationID: z.string().refine((val) => {
      return mongoose.Types.ObjectId.isValid(val);
    }),
    officeID: z.string().refine((val) => {
      return mongoose.Types.ObjectId.isValid(val);
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

export const QuerySchema = z.object({
  lat: z
    .string()
    .transform(Number)
    .refine((val) => !isNaN(val), "Invalid latitude"),
  lng: z
    .string()
    .transform(Number)
    .refine((val) => !isNaN(val), "Invalid longitude"),
  distance: z
    .string()
    .optional()
    .transform(Number)
    .refine((val) => !isNaN(val), "Invalid distance")
    .optional(),
});
