import { z } from "zod";
export declare const GeofenceSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    type: z.ZodEnum<["Polygon", "Circle"]>;
    coordinates: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodNumber, "many">, "many">>;
    center: z.ZodOptional<z.ZodObject<{
        type: z.ZodLiteral<"Point">;
        coordinates: z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>;
    }, "strip", z.ZodTypeAny, {
        type: "Point";
        coordinates: [number, number];
    }, {
        type: "Point";
        coordinates: [number, number];
    }>>;
    radius: z.ZodOptional<z.ZodNumber>;
    properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    lat: z.ZodOptional<z.ZodNumber>;
    lng: z.ZodOptional<z.ZodNumber>;
    organizationID: z.ZodEffects<z.ZodString, string, string>;
    officeID: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "Polygon" | "Circle";
    organizationID: string;
    officeID: string;
    coordinates?: number[][] | undefined;
    description?: string | undefined;
    center?: {
        type: "Point";
        coordinates: [number, number];
    } | undefined;
    radius?: number | undefined;
    properties?: Record<string, any> | undefined;
    lat?: number | undefined;
    lng?: number | undefined;
}, {
    name: string;
    type: "Polygon" | "Circle";
    organizationID: string;
    officeID: string;
    coordinates?: number[][] | undefined;
    description?: string | undefined;
    center?: {
        type: "Point";
        coordinates: [number, number];
    } | undefined;
    radius?: number | undefined;
    properties?: Record<string, any> | undefined;
    lat?: number | undefined;
    lng?: number | undefined;
}>, {
    name: string;
    type: "Polygon" | "Circle";
    organizationID: string;
    officeID: string;
    coordinates?: number[][] | undefined;
    description?: string | undefined;
    center?: {
        type: "Point";
        coordinates: [number, number];
    } | undefined;
    radius?: number | undefined;
    properties?: Record<string, any> | undefined;
    lat?: number | undefined;
    lng?: number | undefined;
}, {
    name: string;
    type: "Polygon" | "Circle";
    organizationID: string;
    officeID: string;
    coordinates?: number[][] | undefined;
    description?: string | undefined;
    center?: {
        type: "Point";
        coordinates: [number, number];
    } | undefined;
    radius?: number | undefined;
    properties?: Record<string, any> | undefined;
    lat?: number | undefined;
    lng?: number | undefined;
}>;
export declare const GeofenceSchemaEdit: z.ZodEffects<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<["Polygon", "Circle"]>>;
    coordinates: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodNumber, "many">, "many">>;
    center: z.ZodOptional<z.ZodObject<{
        type: z.ZodLiteral<"Point">;
        coordinates: z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>;
    }, "strip", z.ZodTypeAny, {
        type: "Point";
        coordinates: [number, number];
    }, {
        type: "Point";
        coordinates: [number, number];
    }>>;
    radius: z.ZodOptional<z.ZodNumber>;
    properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    lat: z.ZodOptional<z.ZodNumber>;
    lng: z.ZodOptional<z.ZodNumber>;
    organizationID: z.ZodEffects<z.ZodString, string, string>;
    officeID: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    organizationID: string;
    officeID: string;
    name?: string | undefined;
    type?: "Polygon" | "Circle" | undefined;
    coordinates?: number[][] | undefined;
    description?: string | undefined;
    center?: {
        type: "Point";
        coordinates: [number, number];
    } | undefined;
    radius?: number | undefined;
    properties?: Record<string, any> | undefined;
    lat?: number | undefined;
    lng?: number | undefined;
}, {
    organizationID: string;
    officeID: string;
    name?: string | undefined;
    type?: "Polygon" | "Circle" | undefined;
    coordinates?: number[][] | undefined;
    description?: string | undefined;
    center?: {
        type: "Point";
        coordinates: [number, number];
    } | undefined;
    radius?: number | undefined;
    properties?: Record<string, any> | undefined;
    lat?: number | undefined;
    lng?: number | undefined;
}>, {
    organizationID: string;
    officeID: string;
    name?: string | undefined;
    type?: "Polygon" | "Circle" | undefined;
    coordinates?: number[][] | undefined;
    description?: string | undefined;
    center?: {
        type: "Point";
        coordinates: [number, number];
    } | undefined;
    radius?: number | undefined;
    properties?: Record<string, any> | undefined;
    lat?: number | undefined;
    lng?: number | undefined;
}, {
    organizationID: string;
    officeID: string;
    name?: string | undefined;
    type?: "Polygon" | "Circle" | undefined;
    coordinates?: number[][] | undefined;
    description?: string | undefined;
    center?: {
        type: "Point";
        coordinates: [number, number];
    } | undefined;
    radius?: number | undefined;
    properties?: Record<string, any> | undefined;
    lat?: number | undefined;
    lng?: number | undefined;
}>;
export declare const QuerySchema: z.ZodObject<{
    lat: z.ZodEffects<z.ZodEffects<z.ZodString, number, string>, number, string>;
    lng: z.ZodEffects<z.ZodEffects<z.ZodString, number, string>, number, string>;
    distance: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodOptional<z.ZodString>, number, string | undefined>, number, string | undefined>>;
}, "strip", z.ZodTypeAny, {
    lat: number;
    lng: number;
    distance?: number | undefined;
}, {
    lat: string;
    lng: string;
    distance?: string | undefined;
}>;
//# sourceMappingURL=index.d.ts.map