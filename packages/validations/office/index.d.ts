import { z } from "zod";
export declare const officeBaseSchema: z.ZodObject<{
    name: z.ZodString;
    organizationId: z.ZodString;
    location: z.ZodObject<{
        type: z.ZodLiteral<"Point">;
        coordinates: z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>;
    }, "strip", z.ZodTypeAny, {
        type: "Point";
        coordinates: [number, number];
    }, {
        type: "Point";
        coordinates: [number, number];
    }>;
    contactDetails: z.ZodObject<{
        phone: z.ZodString;
        email: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
        phone: string;
    }, {
        email: string;
        phone: string;
    }>;
    address: z.ZodObject<{
        street: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        zipCode: z.ZodString;
        country: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    }, {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    }>;
    status: z.ZodDefault<z.ZodEnum<["active", "inactive", "pending"]>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    status: "active" | "inactive" | "pending";
    location: {
        type: "Point";
        coordinates: [number, number];
    };
    organizationId: string;
    contactDetails: {
        email: string;
        phone: string;
    };
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
}, {
    name: string;
    location: {
        type: "Point";
        coordinates: [number, number];
    };
    organizationId: string;
    contactDetails: {
        email: string;
        phone: string;
    };
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    status?: "active" | "inactive" | "pending" | undefined;
}>;
export declare const createOfficeSchema: z.ZodObject<Omit<{
    name: z.ZodString;
    organizationId: z.ZodString;
    location: z.ZodObject<{
        type: z.ZodLiteral<"Point">;
        coordinates: z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>;
    }, "strip", z.ZodTypeAny, {
        type: "Point";
        coordinates: [number, number];
    }, {
        type: "Point";
        coordinates: [number, number];
    }>;
    contactDetails: z.ZodObject<{
        phone: z.ZodString;
        email: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
        phone: string;
    }, {
        email: string;
        phone: string;
    }>;
    address: z.ZodObject<{
        street: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        zipCode: z.ZodString;
        country: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    }, {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    }>;
    status: z.ZodDefault<z.ZodEnum<["active", "inactive", "pending"]>>;
}, "status">, "strip", z.ZodTypeAny, {
    name: string;
    location: {
        type: "Point";
        coordinates: [number, number];
    };
    organizationId: string;
    contactDetails: {
        email: string;
        phone: string;
    };
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
}, {
    name: string;
    location: {
        type: "Point";
        coordinates: [number, number];
    };
    organizationId: string;
    contactDetails: {
        email: string;
        phone: string;
    };
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
}>;
export declare const updateOfficeSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodObject<{
        type: z.ZodLiteral<"Point">;
        coordinates: z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>;
    }, "strip", z.ZodTypeAny, {
        type: "Point";
        coordinates: [number, number];
    }, {
        type: "Point";
        coordinates: [number, number];
    }>>;
    contactDetails: z.ZodOptional<z.ZodObject<{
        phone: z.ZodString;
        email: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
        phone: string;
    }, {
        email: string;
        phone: string;
    }>>;
    address: z.ZodOptional<z.ZodObject<{
        street: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        zipCode: z.ZodString;
        country: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    }, {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    }>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["active", "inactive", "pending"]>>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    status?: "active" | "inactive" | "pending" | undefined;
    location?: {
        type: "Point";
        coordinates: [number, number];
    } | undefined;
    organizationId?: string | undefined;
    contactDetails?: {
        email: string;
        phone: string;
    } | undefined;
    address?: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    } | undefined;
}, {
    name?: string | undefined;
    status?: "active" | "inactive" | "pending" | undefined;
    location?: {
        type: "Point";
        coordinates: [number, number];
    } | undefined;
    organizationId?: string | undefined;
    contactDetails?: {
        email: string;
        phone: string;
    } | undefined;
    address?: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    } | undefined;
}>;
//# sourceMappingURL=index.d.ts.map