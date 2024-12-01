import { z } from "zod";
export declare const OrganizationSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    sector: z.ZodOptional<z.ZodString>;
    createdBy: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    offices: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    contactDetails: z.ZodOptional<z.ZodObject<{
        phone: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        website: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email?: string | undefined;
        phone?: string | undefined;
        website?: string | undefined;
    }, {
        email?: string | undefined;
        phone?: string | undefined;
        website?: string | undefined;
    }>>;
    address: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["active", "inactive", "pending"]>>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
    registrationNumber: z.ZodOptional<z.ZodString>;
    logo: z.ZodOptional<z.ZodString>;
    parentOrganizationId: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    createdBy?: string | undefined;
    status?: "active" | "inactive" | "pending" | undefined;
    sector?: string | undefined;
    offices?: string[] | undefined;
    contactDetails?: {
        email?: string | undefined;
        phone?: string | undefined;
        website?: string | undefined;
    } | undefined;
    address?: string | undefined;
    registrationNumber?: string | undefined;
    logo?: string | undefined;
    parentOrganizationId?: string | undefined;
    tags?: string[] | undefined;
}, {
    name: string;
    description: string;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    createdBy?: string | undefined;
    status?: "active" | "inactive" | "pending" | undefined;
    sector?: string | undefined;
    offices?: string[] | undefined;
    contactDetails?: {
        email?: string | undefined;
        phone?: string | undefined;
        website?: string | undefined;
    } | undefined;
    address?: string | undefined;
    registrationNumber?: string | undefined;
    logo?: string | undefined;
    parentOrganizationId?: string | undefined;
    tags?: string[] | undefined;
}>;
export declare const editOrganizationSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    sector: z.ZodOptional<z.ZodString>;
    createdBy: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    offices: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    contactDetails: z.ZodOptional<z.ZodObject<{
        phone: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        website: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email?: string | undefined;
        phone?: string | undefined;
        website?: string | undefined;
    }, {
        email?: string | undefined;
        phone?: string | undefined;
        website?: string | undefined;
    }>>;
    address: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["active", "inactive", "pending"]>>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
    registrationNumber: z.ZodOptional<z.ZodString>;
    logo: z.ZodOptional<z.ZodString>;
    parentOrganizationId: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    createdBy?: string | undefined;
    status?: "active" | "inactive" | "pending" | undefined;
    description?: string | undefined;
    sector?: string | undefined;
    offices?: string[] | undefined;
    contactDetails?: {
        email?: string | undefined;
        phone?: string | undefined;
        website?: string | undefined;
    } | undefined;
    address?: string | undefined;
    registrationNumber?: string | undefined;
    logo?: string | undefined;
    parentOrganizationId?: string | undefined;
    tags?: string[] | undefined;
}, {
    name?: string | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    createdBy?: string | undefined;
    status?: "active" | "inactive" | "pending" | undefined;
    description?: string | undefined;
    sector?: string | undefined;
    offices?: string[] | undefined;
    contactDetails?: {
        email?: string | undefined;
        phone?: string | undefined;
        website?: string | undefined;
    } | undefined;
    address?: string | undefined;
    registrationNumber?: string | undefined;
    logo?: string | undefined;
    parentOrganizationId?: string | undefined;
    tags?: string[] | undefined;
}>;
//# sourceMappingURL=index.d.ts.map